import * as websocket from "websocket";
import { GameClient } from "./GameClient";
import { DBController } from "../database/DBController";
export declare class GameManager {
    static readonly CLIENT_VERSION_REQUIRED: string;
    private _accounts;
    private _clients;
    private _numClients;
    private _database;
    constructor(database: DBController);
    createClient(conn: websocket.connection): void;
    removeClient(client: GameClient): void;
    private handlClientRequest;
    private processLogin;
    private processLogout;
    private processCharacterList;
    readonly numClients: number;
}
