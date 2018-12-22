import { Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject } from "mongodb";
import { AccountData } from "./AccountData";
import { AccountsCollection } from "./collections/AccountsCollection";
import { CharactersCollection, CharacterDocument, CharacterPreviewDocument } from "./collections/CharactersCollection";

export class DBController{
    private _database:Db;

    constructor(mongoDatabase:Db){
        this._database = mongoDatabase;
        this.createCollections();
    }

    private createCollections():void{
        this._database.createCollection("accounts", (err, res) => {
            this._database.collection("accounts").createIndex({username: 1}, {unique: true})
        });

        this._database.createCollection("salts", (err, res) => {
            this._database.collection("salts").createIndex({username: 1}, {unique: true});
        });

        this._database.createCollection("characters", (err, res) => {
            this._database.collection("characters").createIndex({name: 1}, {unique: true});
        });
    }

    public createAccount(username:string, password:string, accessLevel:number=1):Promise<string>{
        return AccountsCollection.createAccount(this._database, username, password, accessLevel);
    }

    public getAccount(username:string, password:string):Promise<AccountData>{
        return AccountsCollection.getAccount(this._database, username, password);
    }

    public createCharacter(accountID:number, archetypeID:number, name:string, skin?:number):Promise<InsertOneWriteOpResult>{
        return CharactersCollection.createCharacter(this._database, accountID, archetypeID, name, skin);
    }

    public deleteCharacter(accountID:number, name:string):Promise<DeleteWriteOpResultObject>{
        return CharactersCollection.deleteCharacter(this._database, accountID, name);
    }

    public getCharacter(accountID:number, name:string):Promise<CharacterDocument>{
        return CharactersCollection.getCharacter(this._database, accountID, name);
    }

    public getCharacterList(accountID:number):Promise<CharacterPreviewDocument[]>{
        return CharactersCollection.getCharacterList(this._database, accountID);
    }

    public updateCharacter(data:CharacterDocument):Promise<FindAndModifyWriteOpResultObject>{
        return CharactersCollection.updateCharacter(this._database, data);
    }
}