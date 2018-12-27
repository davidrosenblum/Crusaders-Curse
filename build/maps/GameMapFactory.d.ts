import { MapType, MapInstanceType } from "../data/Data";
import { GameMapInstance } from "./GameMapInstance";
import { GameMapOpen } from "./GameMapOpen";
export declare class GameMapFactory {
    static createInstance(instanceType: MapInstanceType): GameMapInstance;
    static createMap(mapType: MapType): GameMapOpen;
    static createDefaultMaps(): {
        [id: number]: GameMapOpen;
    };
}
