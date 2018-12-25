/// <reference types="node" />
import { EventEmitter } from "events";
import { GameClient } from "../server/GameClient";
import { CasterObject } from "../entities/CasterObject";
import { TransportNodeFullState } from "./TransportNode";
import { GameObjectFullState } from "../entities/GameObject";
export interface MapFullState {
    transportNodes: TransportNodeFullState[];
    units: GameObjectFullState[];
    mapData: number[][];
}
export declare class MapInstance extends EventEmitter {
    private static tokenGen;
    private _mapName;
    private _mapID;
    private _instanceID;
    private _mapData;
    private _clients;
    private _units;
    private _transportNodes;
    private _numClients;
    constructor(mapName: string, mapID: number, mapData: number[][]);
    addClient(client: GameClient): void;
    removeClient(client: GameClient): void;
    addUnit(unit: CasterObject): boolean;
    removeUnit(unit: CasterObject): boolean;
    createTransportNode(type: string, text: string, row: number, col: number, outMapID: any, outX: any, outY: any): void;
    hasClient(client: GameClient): boolean;
    hasUnit(unit: CasterObject): boolean;
    private getState;
    private forEachClient;
    private forEachUnit;
    private forEachTransportNode;
    readonly numClients: number;
    readonly isEmpty: boolean;
    readonly mapName: string;
    readonly mapID: number;
    readonly instanceID: string;
}
