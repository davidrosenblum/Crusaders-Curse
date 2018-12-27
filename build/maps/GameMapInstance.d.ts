import { GameMap } from "./GameMap";
import { MapInstanceType, MapData } from "../data/Data";
export declare class GameMapInstance extends GameMap {
    private static tokenGen;
    private _instanceID;
    private _instanceType;
    constructor(name: string, instanceType: MapInstanceType, mapData: MapData);
    readonly instanceID: string;
    readonly instanceType: MapInstanceType;
}
