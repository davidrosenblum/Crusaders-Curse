import * as websocket from "websocket";
import { GameClient, GameClientRequest } from "./GameClient";
import { OpCode, Status, Archetype } from "../data/Data";
import { DBController } from "../database/DBController";
import { GameMap, GameMapFullState } from "../maps/GameMap";
import { CombatStats } from "../entities/CombatObject";
import { AccountsHandler } from "./gamehandlers/AccountsHandler";
import { ChatHandler } from "./gamehandlers/ChatHandler";
import { CharactersHandler } from "./gamehandlers/CharactersHandler";
import { MapsHandler } from "./gamehandlers/MapsHandler";

export class GameController{
    private _database:DBController;
    private _clients:{[id:string]: GameClient};
    private _numClients:number;
    private _accounts:AccountsHandler;
    private _characters:CharactersHandler;
    private _maps:MapsHandler;
    private _chat:ChatHandler;

    constructor(database:DBController){
        this._database = database;
        this._clients = {};
        this._numClients = 0;

        this._maps = new MapsHandler(this._database);
        this._accounts = new AccountsHandler(this._database);
        this._characters = new CharactersHandler(this._database, this._maps);
        this._chat = new ChatHandler();

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
                this._accounts.logout(client);
            }
        }
    }

    private handlClientRequest(req:GameClientRequest):void{
        let {client, opCode, data} = req;

        switch(opCode){
            case OpCode.ACCOUNT_LOGIN:
                this._accounts.login(client, data);
                break;
            case OpCode.ACCOUNT_LOGOUT:
                this._accounts.logout(client);
                break;
            case OpCode.CHARACTER_LIST:
                this._characters.getCharacters(client);
                break;
            case OpCode.CHARACTER_CREATE:
                this._characters.createCharacter(client, data);
                break;
            case OpCode.CHARACTER_SELECT:
                this._characters.selectCharacter(client, data);
                break;
            case OpCode.ENTER_MAP:
                this._maps.enterMap(client, data);
                break;
            case OpCode.ENTER_INSTANCE:
                this._maps.enterInstance(client, data);
                break;
            case OpCode.CHAT_MESSAGE:
                this._chat.chatMessage(client, data);
                break;
            case OpCode.OBJECT_STATS:
                this.processStats(client, data);
                break;
            default:
                client.send(OpCode.INVALID_OPCODE, "Invalid OpCode", Status.BAD);
                break;
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

    

    

    public get numClients():number{
        return this._numClients;
    }
}