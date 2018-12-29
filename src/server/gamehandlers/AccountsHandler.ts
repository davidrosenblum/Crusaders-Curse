import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";
import { DBController } from "../../database/DBController";

export class AccountsHandler{
    public static readonly CLIENT_VERSION_REQUIRED:string = "0.1.0";

    private _database:DBController;
    private _accounts:{[username:string]: GameClient};

    constructor(database:DBController){
        this._database = database;
        this._accounts = {};
    }

    public login(client:GameClient, data:any):void{
        if(client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGIN, "You are already logged in.", Status.BAD);
            return;
        }

        let {username=null, password=null, version=null} = data;

        if(!username || !password || !version){
            client.send(OpCode.ACCOUNT_LOGIN, "Invalid request json - missing username and/or password and/or version.", Status.BAD);
            return;
        }

        if(version !== AccountsHandler.CLIENT_VERSION_REQUIRED){
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

    public logout(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.ACCOUNT_LOGOUT, "Account is not logged in.", Status.BAD);
            return;
        }

        delete this._accounts[client.username];

        client.setAccountData(null);
        client.send(OpCode.ACCOUNT_LOGOUT, "You have logged out.", Status.GOOD);
    }
}