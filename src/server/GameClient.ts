import * as websocket from "websocket";
import { OpCode, Status } from "../data/Data";
import { TokenGenerator } from "../utils/TokenGenerator";
import { AccountData } from "../database/AccountData";
import { Player } from "../entities/Player";

export interface ClientRequest{
    opCode:OpCode;
    data:any;
}

export class GameClient{
    public static readonly MSG_DELIM:string = "?&?";

    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _conn:websocket.connection;
    private _clientID:string;
    private _accountData:AccountData;
    public player:Player;

    constructor(connection:websocket.connection){
        this._conn = connection;
        this._clientID = GameClient.tokenGen.nextToken();
        this._accountData = null;
        this.player = null;
    }

    public send(opCode:OpCode, data:any=null, status:Status=Status.GOOD):void{
        this._conn.send(JSON.stringify({opCode, data, status}));
    }

    public setAccountData(accountData:AccountData):void{
        this._accountData = accountData;
    }

    public get username():string{
        return this._accountData ? this._accountData.username : null;
    }

    public get hasAccountData():boolean{
        return this._accountData = null;
    }

    public get clientID():string{
        return this._clientID;
    }

    public static parseRequests(message:websocket.IMessage, handler:(req:ClientRequest)=>any):void{
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

            handler({opCode, data});
        });
    }
}