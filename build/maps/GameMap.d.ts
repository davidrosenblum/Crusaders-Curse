/// <reference types="node" />
import { EventEmitter } from "events";
import { GameClient } from "../server/GameClient";
import { CasterObject } from "../entities/CasterObject";
import { TransportNodeFullState, TransportNodeType } from "./TransportNode";
import { MapData } from "../data/Data";
import { GameObjectFullState } from "../entities/GameObject";
import { CombatStats } from "../entities/CombatObject";
export interface GameMapFullState {
    transportNodes: TransportNodeFullState[];
    units: GameObjectFullState[];
    mapData: MapData;
}
export declare abstract class GameMap extends EventEmitter {
    private _mapData;
    private _clients;
    private _units;
    private _transportNodes;
    private _numClients;
    constructor(mapData: MapData);
    private bulkUpdate;
    submitChat(chat: string, from: string): void;
    addClient(client: GameClient, successBeforePlayerAdd?: (done: Function) => any): void;
    removeClient(client: GameClient): void;
    addUnit(unit: CasterObject): boolean;
    removeUnit(unit: CasterObject): boolean;
    createTransportNode(type: TransportNodeType, text: string, row: number, col: number, outMapID: any, outX: any, outY: any): void;
    hasClient(client: GameClient): boolean;
    hasUnit(unit: CasterObject): boolean;
    getUnitStats(objectID: string): CombatStats;
    getObjectById(objectID: string): CasterObject;
    private getState;
    private forEachClient;
    private forEachUnit;
    private forEachTransportNode;
    readonly numClients: number;
    readonly isEmpty: boolean;
}
