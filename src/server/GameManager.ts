import * as websocket from "websocket";
import { GameClient, GameClientRequest } from "./GameClient";
import { OpCode, Status, Archetype } from "../data/Data";
import { DBController } from "../database/DBController";
import { Player } from "../entities/Player";
import { PlayerFactory } from "../entities/PlayerFactory";
import { CharacterDocument } from "../database/collections/CharactersCollection";
import { GameMapFactory } from "../maps/GameMapFactory";
import { GameMapOpen } from "../maps/GameMapOpen";
import { GameMapInstance } from "../maps/GameMapInstance";
import { GameMap } from "../maps/GameMap";
import { CasterObject } from "../entities/CasterObject";
import { CombatStats } from "../entities/CombatObject";

export class GameManager{
    public static readonly CLIENT_VERSION_REQUIRED:string = "0.1.0";

    private _database:DBController;
    private _accounts:{[username:string]: GameClient};
    private _clients:{[id:string]: GameClient};
    private _numClients:number;
    private _maps:{[id:number]: GameMapOpen};
    private _instances:{[id:number]: GameMapInstance};

    constructor(database:DBController){
        this._database = database;
        this._accounts = {};
        this._clients = {};
        this._numClients = 0;
        this._maps = {};
        this._instances = {};
    }

    public createClient(conn:websocket.connection):void{
        let client:GameClient = new GameClient(conn);

        console.log(`Client-${client.clientID} connected.`);
        conn.on("message", data => {
            console.log(data.utf8Data);
            GameClient.parseRequests(client, data, this.handlClientRequest.bind(this));
        });

        conn.on("error", err => {
            // handle? 
            console.log(err.message);
        });

        conn.on("close", () => this.removeClient(client));
    }

    public removeClient(client:GameClient):void{
        if(delete this._clients[client.clientID]){
            this._numClients--;

            if(client.hasAccountData){
                delete this._accounts[client.username];
            }
        }
    }

    private handlClientRequest(req:GameClientRequest):void{
        let {client, opCode, data} = req;

        switch(opCode){
            case OpCode.ACCOUNT_LOGIN:
                this.processLogin(client, data);
                break;
            case OpCode.ACCOUNT_LOGOUT:
                this.processLogout(client);
                break;
            case OpCode.CHARACTER_LIST:
                this.processCharacterList(client);
                break;
            case OpCode.CHARACTER_CREATE:
                this.processCharacterCreate(client, data);
                break;
            case OpCode.CHARACTER_SELECT:
                this.processCharacterSelect(client, data);
                break;
            case OpCode.ENTER_MAP:
                this.processMapEnter(client, data);
                break;
            case OpCode.ENTER_INSTANCE:
                this.processInstanceEnter(client, data);
                break;
            case OpCode.CHAT_MESSAGE:
                this.processChat(client, data);
                break;
            case OpCode.OBJECT_STATS:
                this.processStats(client, data);
                break;
            default:
                client.send(OpCode.INVALID_OPCODE, "Invalid OpCode", Status.BAD);
                break;
        }
    }

    private processLogin(client:GameClient, data:any):void{
        if(client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGIN, "You are already logged in.", Status.BAD);
            return;
        }

        let {username=null, password=null, version=null} = data;

        if(!username || !password || !version){
            client.send(OpCode.ACCOUNT_LOGIN, "Invalid request json - missing username and/or password and/or version.", Status.BAD);
            return;
        }

        if(version !== GameManager.CLIENT_VERSION_REQUIRED){
            client.send(OpCode.ACCOUNT_LOGIN, "Wrong client version.", Status.BAD);
            return;
        }

        if(username in this._accounts){
            client.send(OpCode.ACCOUNT_LOGIN, "Account already logged in.", Status.BAD);
            return;
        }

        this._database.getAccount(username, password)
            .then(account => {
                console.log(account);
                client.setAccountData(account);
                client.send(OpCode.ACCOUNT_LOGIN, {clientID: client.clientID}, Status.GOOD);
            }) 
            .catch(err => client.send(OpCode.ACCOUNT_LOGIN, err.message, Status.BAD));
    }

    private processLogout(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGOUT, "Account is not logged in.", Status.BAD);
            return;
        }

        client.setAccountData(null);
        client.send(OpCode.ACCOUNT_LOGOUT, "You have logged out.", Status.GOOD);
    }

    private processCharacterList(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_LIST, "Account is not logged in.", Status.BAD);
            return;
        }

        this._database.getCharacterList(client.accountID)
            .then(characterList => client.send(OpCode.CHARACTER_LIST, {characterList}, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_LIST, err.message, Status.BAD))
    }

    private processCharacterCreate(client:GameClient, data:any):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_CREATE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {name=null, archetype=null, skin=null} = data;

        if(!name || !archetype){
            client.send(OpCode.CHARACTER_CREATE, "Invalid request json - missing name and/or archetype.", Status.BAD);
            return;
        }

        let archetypeID:number = -1;
        switch(archetype.toLowerCase()){
            case "knight":
                archetypeID = Archetype.KNIGHT;
                break;
            case "ranger":
                archetypeID = Archetype.RANGER;
                break;
            case "mage":
                archetypeID = Archetype.MAGE;
                break;
        }

        if(archetypeID === -1){
            client.send(OpCode.CHARACTER_CREATE, "Invalid request json - invalid archetype.", Status.BAD);
            return;
        }

        this._database.createCharacter(client.accountID, archetypeID, name, skin)
            .then(message => client.send(OpCode.CHARACTER_CREATE, message, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_CREATE, err.message, Status.BAD));
    }

    private processCharacterSelect(client:GameClient, data:any):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_SELECT, "Account is not logged in.", Status.BAD);
            return;
        }

        if(client.player){
            client.send(OpCode.CHARACTER_SELECT, "Player already selected.", Status.BAD);
            return;
        }

        let {name} = data;

        client.setPlayerName(name);

        this.loadPlayer(client)
            .then(saveData => {
                let mapID:number = saveData.last_map.map_id;
                this.processMapEnter(client, {mapID});
            })
            .catch(err => {
                client.setPlayerName(null);
                client.send(OpCode.CHARACTER_SELECT, err.message, Status.BAD);
            });
    }

    private processMapEnter(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.playerName){
            client.send(OpCode.ENTER_MAP, "Account is not logged in.", Status.BAD);
            return;
        }

        let {mapID=null} = data;

        if(!mapID){
            client.send(OpCode.ENTER_MAP, "Invalid request json - missing map ID.")
            return;
        }

        let map:GameMapOpen = this._maps[mapID] || null;
        if(!map){
            client.send(OpCode.ENTER_MAP, "Invalid map ID.");
            return;
        }

        if(client.player.map){
            client.player.map.removeClient(client);
        }

        try{
            map.addClient(client); // sends the map join packet
        }
        catch(err){
            client.send(OpCode.ENTER_MAP, err.message, Status.BAD);
        }
    }

    private processInstanceEnter(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.playerName){
            client.send(OpCode.ENTER_INSTANCE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {instanceID=null, instanceType=null} = data;

        if(!instanceID && !instanceType){
            client.send(OpCode.ENTER_INSTANCE, "Invalid request json - missing instance ID or new instance type.");
            return;
        }

        let instance:GameMapInstance = null;

        if(instanceID){
            instance = this._instances[instanceID] || null;
        }
        else if(instanceType){
            try{
                instance = GameMapFactory.createInstance(instanceType);
                instance.on("empty", () => delete this._instances[instance.instanceID]);
            }
            catch(err){
                client.send(OpCode.ENTER_INSTANCE, `Unable to create instance: ${err.message}`, Status.BAD);
                return;
            }
        }

        if(!instance){
            client.send(OpCode.ENTER_INSTANCE, "Instance not found.", Status.BAD);
            return;
        }

        try{
            // sends the map join packet
            instance.addClient(client, done => {
                this.loadPlayer(client)
                    .then(() => done())
                    .catch(err => client.send(OpCode.ENTER_INSTANCE, err.message, Status.BAD));
            }); 
        }
        catch(err){
            client.send(OpCode.ENTER_INSTANCE, err.message, Status.BAD);
        }
    }

    private processChat(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.playerName){
            client.send(OpCode.CHAT_MESSAGE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {chat=null} = data;

        if(typeof chat === "string"){
            if(chat.charAt(0) === "~" && client.accessLevel > 1){
                this.adminCommand(client, chat);
            }
            else{
                client.player.map.submitChat(chat, client.playerName);
            }
        }  
    } 

    private processStats(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.player){
            client.send(OpCode.OBJECT_STATS, "Account is not logged in.", Status.BAD);
            return;
        }

        let {objectID=null} = data;

        if(!objectID){
            client.send(OpCode.OBJECT_STATS, "Invalid json request - missing objectID.", Status.BAD);
            return;
        }

        let map:GameMap = client.player.map;
        if(map){
            let stats:CombatStats = client.player.map.getUnitStats(objectID);

            if(stats){
                client.send(OpCode.OBJECT_STATS, stats, Status.GOOD);
            }
            else{
                client.send(OpCode.OBJECT_STATS, "Invalid target ID.", Status.BAD);
            }
        }
        else{
            client.send(OpCode.OBJECT_STATS, "You are not in a map.", Status.BAD);
        }
        
    }

    private processPotionList(client:GameClient):void{
        if(!client.player){
            client.send(OpCode.POTION_LIST, "Account is not logged in.", Status.BAD);
            return;
        }

        client.send(OpCode.POTION_LIST, {}, Status.GOOD);
    }


    private processAbilityList(client:GameClient):void{
        if(!client.player){
            client.send(OpCode.ABILITY_LIST, "Account is not logged in.", Status.BAD);
            return;
        }
    }

    private loadPlayer(client:GameClient):Promise<CharacterDocument>{
        return new Promise((resolve, reject) => {
            this._database.getCharacter(client.accountID, client.playerName)
                .then(saveData => {
                    client.player = PlayerFactory.restoreFromSave(saveData);
                    resolve(saveData);
                })
                .catch(err => reject(err));
        });
    }

    private adminCommand(client:GameClient, chat:string):void{

    }

    public get numClients():number{
        return this._numClients;
    }
}