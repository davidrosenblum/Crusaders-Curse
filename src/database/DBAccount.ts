import { DBAccountSchema } from "./DBSchema";

export class DBAccount{
    private _accountID:number;
    private _username:string;

    constructor(accountID:number, username:string){
        this._accountID = accountID;
        this._username = username;
    }

    public get accountID():number{
        return this._accountID;
    }

    public get username():string{
        return this._username;
    }
}