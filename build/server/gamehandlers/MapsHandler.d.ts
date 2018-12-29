import { GameClient } from "../GameClient";
import { DBController } from "../../database/DBController";
export declare class MapsHandler {
    private _database;
    private _maps;
    private _instances;
    private _numInstances;
    constructor(database: DBController);
    private loadPlayer;
    enterMap(client: GameClient, data: any): void;
    enterInstance(client: GameClient, data: any): void;
    updateUnit(client: GameClient, data: any): void;
    getUnitStats(client: GameClient, data: any): void;
    readonly numInstances: number;
}
