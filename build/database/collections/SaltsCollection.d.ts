import { Db, InsertOneWriteOpResult } from "mongodb";
export interface SaltDocument {
    username: string;
    salt: string;
}
export declare class SaltsCollection {
    static storeSalt(database: Db, username: string, salt: string): Promise<InsertOneWriteOpResult>;
    static getSalt(database: Db, username: string): Promise<SaltDocument>;
}
