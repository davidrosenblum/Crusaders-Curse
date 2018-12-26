import { Db, FindAndModifyWriteOpResultObject } from "mongodb";
import { AccountData } from "./AccountData";
import { CharacterDocument, CharacterPreviewDocument } from "./collections/CharactersCollection";
export declare class DBController {
    private _database;
    constructor(mongoDatabase: Db);
    private createCollections;
    createAccount(username: string, password: string, accessLevel?: number): Promise<string>;
    getAccount(username: string, password: string): Promise<AccountData>;
    createCharacter(accountID: string, archetypeID: number, name: string, skin?: number): Promise<string>;
    deleteCharacter(accountID: string, name: string): Promise<string>;
    getCharacter(accountID: string, name: string): Promise<CharacterDocument>;
    getCharacterList(accountID: string): Promise<CharacterPreviewDocument[]>;
    updateCharacter(data: CharacterDocument): Promise<FindAndModifyWriteOpResultObject>;
}
