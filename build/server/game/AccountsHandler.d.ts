import { GameClient } from "../GameClient";
import { DBController } from "../../database/DBController";
export declare class AccountsHandler {
    static readonly CLIENT_VERSION_REQUIRED: string;
    private _database;
    private _accounts;
    constructor(database: DBController);
    login(client: GameClient, data: any): void;
    logout(client: GameClient): void;
}
