import { Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject } from "mongodb";
import { DBAccount } from "./DBAccount";
import { DBCharacterSchema, DBCharacterPreviewSchema } from "./DBSchema";
export declare class DBController {
    private static readonly PASSWORD_SIZE;
    private static readonly HASH_VALS;
    private static tokenGen;
    private _database;
    constructor(mongoDatabase: Db);
    private static salt;
    private static hash;
    private createCollections;
    createAccount(username: string, password: string, accessLevel?: number): Promise<string>;
    getAccount(username: string, password: string): Promise<DBAccount>;
    private storeSalt;
    private getSalt;
    createCharacter(accountID: number, archetypeID: number, name: string, skin?: number): Promise<InsertOneWriteOpResult>;
    deleteCharacter(accountID: number, name: string): Promise<DeleteWriteOpResultObject>;
    getCharacter(accountID: number, name: string): Promise<DBCharacterSchema>;
    getCharacterList(accountID: number): Promise<DBCharacterPreviewSchema[]>;
    updateCharacter(data: DBCharacterSchema): Promise<FindAndModifyWriteOpResultObject>;
}
