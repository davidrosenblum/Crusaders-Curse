import * as websocket from "websocket";
import { GameClient, GameClientRequest } from "./GameClient";
import { OpCode, Status, Archetype } from "../data/Data";
import { DBController } from "../database/DBController";
import { Player } from "../entities/Player";
import { PlayerFactory } from "../entities/PlayerFactory";

export class GameManager{
    public static readonly CLIENT_VERSION_REQUIRED:string = "0.1.0";

    private _accounts:{[username:string]: GameClient};
    private _clients:{[id:string]: GameClient};
    private _numClients:number;
    private _database:DBController;

    constructor(database:DBController){
        this._accounts = {};
        this._clients = {};
        this._numClients = 0;
    }

    public createClient(conn:websocket.connection):void{
        let client:GameClient = new GameClient(conn);

        conn.on("message", data => {
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
            default:
                client.send(OpCode.INVALID_OPCODE, "Invalid OpCode", Status.BAD);
                break;
        }
    }

    private processLogin(client:GameClient, data:any):void{
        let {username=null, password=null, version=null} = data;

        if(client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGIN, "You are already logged in.", Status.BAD);
            return;
        }

        if(!username || !password || !version){
            client.send(OpCode.ACCOUNT_LOGIN, "Invalid request json.", Status.BAD);
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
                client.setAccountData(account);
                client.send(OpCode.ACCOUNT_LOGIN, {clientID: client.clientID}, Status.GOOD);
            }) 
            .catch(err => client.send(OpCode.ACCOUNT_LOGIN, err.message, Status.BAD));
    }

    private processLogout(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGOUT, "Account are not logged in.", Status.BAD);
            return;
        }

        client.setAccountData(null);
        client.send(OpCode.ACCOUNT_LOGOUT, "You have logged out.", Status.GOOD);
    }

    private processCharacterList(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_LIST, "Account are not logged in.", Status.BAD);
            return;
        }

        this._database.getCharacterList(client.accountID)
            .then(list => client.send(OpCode.CHARACTER_LIST, list, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_LIST, err.message, Status.BAD))
    }

    private processCharacterCreate(client:GameClient, data:any):void{
        let {name=null, archetype=null, skin=null} = data;

        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_CREATE, "Account are not logged in.", Status.BAD);
            return;
        }

        if(!name || !archetype){
            client.send(OpCode.CHARACTER_CREATE, "Invalid request json.", Status.BAD);
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
            client.send(OpCode.CHARACTER_CREATE, "Invalid archetype.", Status.BAD);
            return;
        }

        this._database.createCharacter(client.accountID, archetypeID, name, skin)
            .then(report => client.send(OpCode.CHARACTER_CREATE, report, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_CREATE, err.message, Status.BAD));
    }

    private processCharacterSelect(client:GameClient, data:any):void{
        let {name} = data;

        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_SELECT, "Account are not logged in.", Status.BAD);
            return;
        }

        if(client.player){
            client.send(OpCode.CHARACTER_SELECT, "Player already selected.", Status.BAD);
            return;
        }

        client.setPlayerName(name);

        this.loadPlayer(client)
            .then(() => {
                // join map! 
            })
            .catch(err => {
                client.setPlayerName(null);
                client.send(OpCode.CHARACTER_SELECT, err.message, Status.BAD)
            });
    }

    private loadPlayer(client:GameClient):Promise<Player>{
        return new Promise((resolve, reject) => {
            this._database.getCharacter(client.accountID, client.playerName)
                .then(saveData => {
                    client.player = PlayerFactory.restoreFromSave(saveData);
                    resolve(client.player);
                })
                .catch(err => reject(err));
        });
        
    }

    public get numClients():number{
        return this._numClients;
    }
}