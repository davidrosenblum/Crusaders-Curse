import * as websocket from "websocket";
import { GameClient } from "./GameClient";
import { DBController } from "../../database/DBController";
export declare class GameManager {
    private _database;
    private _accounts;
    private _clients;
    private _numClients;
    private _maps;
    private _instances;
    constructor(database: DBController);
    createClient(conn: websocket.connection): void;
    removeClient(client: GameClient): void;
    private handlClientRequest;
    private processLogout;
    private processCharacterList;
    private processCharacterCreate;
    private processCharacterSelect;
    private processMapEnter;
    private processInstanceEnter;
    private processChat;
    private processStats;
    private processPotionList;
    private processAbilityList;
    private loadPlayer;
    private adminCommand;
    readonly numClients: number;
}
