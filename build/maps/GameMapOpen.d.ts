import { GameMap } from "./GameMap";
import { MapType, MapData } from "../data/Data";
export declare class GameMapOpen extends GameMap {
    private _mapName;
    private _mapType;
    constructor(name: string, mapType: MapType, mapData: MapData);
    readonly mapType: MapType;
}
