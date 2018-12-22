import { Db } from "mongodb";
import { AccountData } from "../AccountData";
export interface AccountDocument {
    accountID?: number;
    username: string;
    password: string;
    access_level: number;
    enabled: boolean;
    date_joined: number;
}
export declare class AccountsCollection {
    static readonly PASSWORD_LENGTH: number;
    private static saltedHasher;
    static createAccount(database: Db, username: string, password: string, accessLevel?: number): Promise<string>;
    static getAccount(database: Db, username: string, password: string): Promise<AccountData>;
}
