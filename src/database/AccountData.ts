export class AccountData{
    private _accountID:number;
    private _username:string;
    private _accessLevel:number;

    constructor(accountID:number, username:string, accessLevel:number){
        this._accountID = accountID;
        this._username = username;
        this._accessLevel = accessLevel;
    }

    public get accountID():number{
        return this._accountID;
    }

    public get username():string{
        return this._username;
    }

    public get accessLevel():number{
        return this._accessLevel;
    }
}