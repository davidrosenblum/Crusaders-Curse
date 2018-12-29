import * as websocket from "websocket";
import { GameClient } from "./GameClient";
import { DBController } from "../database/DBController";
export declare class GameController {
    private _database;
    private _clients;
    private _numClients;
    private _accounts;
    private _characters;
    private _maps;
    private _chat;
    constructor(database: DBController);
    createClient(conn: websocket.connection): void;
    removeClient(client: GameClient): void;
    private handlClientRequest;
    readonly numClients: number;
}
