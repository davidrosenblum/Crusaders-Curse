/// <reference types="node" />
import { EventEmitter } from "events";
import { GameClient } from "../GameClient";
import { DBController } from "../../database/DBController";
export declare class CharactersHandler extends EventEmitter {
    private _database;
    constructor(database: DBController);
    listCharacters(client: GameClient): void;
    createCharacter(client: GameClient, data: any): void;
    selectCharacter(client: GameClient, data: any): void;
}
