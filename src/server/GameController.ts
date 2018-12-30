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
import { AbilitiesHandler } from "./gamehandlers/AbilitiesHandler";

export class GameController{
    private _database:DBController;
    private _clients:{[id:string]: GameClient};
    private _numClients:number;
    private _accounts:AccountsHandler;
    private _characters:CharactersHandler;
    private _maps:MapsHandler;
    private _chat:ChatHandler;
    private _abilities:AbilitiesHandler;

    constructor(database:DBController){
        this._database = database;
        this._clients = {};
        this._numClients = 0;

        this._maps = new MapsHandler(this._database);
        this._accounts = new AccountsHandler(this._database);
        this._characters = new CharactersHandler(this._database, this._maps);
        this._chat = new ChatHandler();
        this._abilities = new AbilitiesHandler();
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

        conn.on("close", () => {
            console.log(`Client-${client.clientID} disconnected.`);
            this.removeClient(client);
        });
    }

    public removeClient(client:GameClient):void{
        if(delete this._clients[client.clientID]){
            this._numClients--;

            if(client.hasAccountData){
                this._accounts.logout(client);
            }

            if(client.player && client.player.map){
                client.player.map.removeClient(client);
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
            case OpCode.OBJECT_UPDATE:
                this._maps.updateUnit(client, data);
                break;
            case OpCode.OBJECT_STATS:
                this._maps.getUnitStats(client, data);
                break;
            case OpCode.ABILITY_LIST:
                this._abilities.getAbilities(client);
                break;
            case OpCode.ABILITY_CAST:
                this._abilities.castAbility(client, data);
                break;
            case OpCode.ABILITY_PURCHASE:
                this._abilities.purchaseAbility(client, data);
                break;
            default:
                client.send(OpCode.INVALID_OPCODE, "Invalid OpCode", Status.BAD);
                break;
        }
    }

    public get numClients():number{
        return this._numClients;
    }
}