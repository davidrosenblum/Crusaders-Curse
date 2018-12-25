import { GameMap } from "./GameMap";
import { MapInstanceType, MapData } from "../data/Data";
export declare class GameMapInstance extends GameMap {
    private static tokenGen;
    private _instanceID;
    private _instanceName;
    private _instanceType;
    constructor(instanceName: string, instanceType: MapInstanceType, mapData: MapData);
    readonly instanceID: string;
    readonly instanceName: string;
    readonly instanceType: MapInstanceType;
}
