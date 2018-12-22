import { Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject } from "mongodb";
import { AccountData } from "./AccountData";
import { CharacterDocument, CharacterPreviewDocument } from "./collections/CharactersCollection";
export declare class DBController {
    private _database;
    constructor(mongoDatabase: Db);
    private createCollections;
    createAccount(username: string, password: string, accessLevel?: number): Promise<string>;
    getAccount(username: string, password: string): Promise<AccountData>;
    createCharacter(accountID: number, archetypeID: number, name: string, skin?: number): Promise<InsertOneWriteOpResult>;
    deleteCharacter(accountID: number, name: string): Promise<DeleteWriteOpResultObject>;
    getCharacter(accountID: number, name: string): Promise<CharacterDocument>;
    getCharacterList(accountID: number): Promise<CharacterPreviewDocument[]>;
    updateCharacter(data: CharacterDocument): Promise<FindAndModifyWriteOpResultObject>;
}
