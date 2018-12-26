import * as websocket from "websocket";
import { OpCode, Status } from "../data/Data";
import { TokenGenerator } from "../utils/TokenGenerator";
import { AccountData } from "../database/AccountData";
import { Player } from "../entities/Player";

export interface GameClientRequest{
    opCode:OpCode;
    data:any;
    client:GameClient;
}

export interface GameClientResponse{
    opCode:OpCode;
    data:any;
    status:Status;
}

export class GameClient{
    public static readonly MSG_DELIM:string = "?&?";

    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _conn:websocket.connection;
    private _clientID:string;
    private _accountData:AccountData;
    private _playerName:string;
    public player:Player;

    constructor(connection:websocket.connection){
        this._conn = connection;
        this._clientID = GameClient.tokenGen.nextToken();
        this._accountData = null;
        this._playerName = null;
        this.player = null;
    }

    public send(opCode:OpCode, data:any=null, status:Status=Status.GOOD):void{
        data = (typeof data === "string") ? {message: data} : data;

        this._conn.send(JSON.stringify({opCode, data, status}) + GameClient.MSG_DELIM);
    }

    public sendString(string:string, delimit:boolean=true):void{
        delimit ? this._conn.send(`${string}${GameClient.MSG_DELIM}`) : this._conn.send(string);
    }

    public setAccountData(accountData:AccountData):void{
        this._accountData = accountData;
    }

    public setPlayerName(playerName:string):void{
        this._playerName = playerName;
    }

    public get username():string{
        return this._accountData ? this._accountData.username : null;
    }

    public get accountID():string{
        return this._accountData ? this._accountData.accountID : null;
    }

    public get accessLevel():number{
        return this._accountData ? this._accountData.accessLevel : -1;
    }

    public get hasAccountData():boolean{
        return this._accountData !== null;
    }

    public get playerName():string{
        return this._playerName;
    }

    public get clientID():string{
        return this._clientID;
    }

    public static parseRequests(client:GameClient, message:websocket.IMessage, handler:(req:GameClientRequest)=>any):void{
        message.utf8Data.split(GameClient.MSG_DELIM).forEach(msg => {
            let opCode:OpCode, data:any;

            try{
                let json:any = JSON.parse(msg);
                
                opCode = json.opCode || -1;
                data = json.data || null;
            }
            catch(err){
                return;
            }

            handler({client, opCode, data});
        });
    }
}