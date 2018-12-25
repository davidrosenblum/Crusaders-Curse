import { GameMap } from "./GameMap";
import { MapType, MapData } from "../data/Data";
export declare class GameMapOpen extends GameMap {
    private _mapName;
    private _mapType;
    constructor(mapName: string, mapType: MapType, mapData: MapData);
    readonly mapName: string;
    readonly mapType: MapType;
}
