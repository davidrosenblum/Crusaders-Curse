import { GameClient } from "../GameClient";
import { DBController } from "../../database/DBController";
import { MapsHandler } from "./MapsHandler";
export declare class CharactersHandler {
    private _database;
    private _maps;
    constructor(database: DBController, mapsHandler: MapsHandler);
    getCharacters(client: GameClient): void;
    createCharacter(client: GameClient, data: any): void;
    selectCharacter(client: GameClient, data: any): void;
}
