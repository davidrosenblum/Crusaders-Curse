/// <reference types="node" />
import { EventEmitter } from "events";
import { GameClient } from "../server/GameClient";
import { CasterObject } from "../entities/CasterObject";
import { TransportNodeFullState, TransportNodeType } from "./TransportNode";
import { MapData, NPCType } from "../data/Data";
import { GameObjectFullState, GameObjectState } from "../entities/GameObject";
import { CombatStats } from "../entities/CombatObject";
export interface GameMapFullState {
    name: string;
    transportNodes: TransportNodeFullState[];
    units: GameObjectFullState[];
    mapData: MapData;
}
export declare abstract class GameMap extends EventEmitter {
    private _name;
    private _mapData;
    private _clients;
    private _units;
    private _transportNodes;
    private _numClients;
    constructor(name: string, mapData: MapData);
    private bulkUpdate;
    submitChat(chat: string, from?: string): void;
    addClient(client: GameClient, successBeforePlayerAdd?: (done: Function) => any): void;
    removeClient(client: GameClient): void;
    addUnit(unit: CasterObject): boolean;
    removeUnit(unit: CasterObject): boolean;
    updateUnit(update: GameObjectState): void;
    createTransportNode(type: TransportNodeType, text: string, col: number, row: number, outMapID: any, outX: any, outY: any): void;
    createNPC(type: NPCType, col?: number, row?: number, anim?: string, name?: string): void;
    unitCastAbility(casterID: string, abilityName: string, targetID: string): void;
    hasClient(client: GameClient): boolean;
    hasUnit(unit: CasterObject): boolean;
    getUnitStats(objectID: string): CombatStats;
    getUnitById(objectID: string): CasterObject;
    private getState;
    private forEachClient;
    private forEachUnit;
    private forEachTransportNode;
    readonly numClients: number;
    readonly isEmpty: boolean;
    readonly name: string;
}
