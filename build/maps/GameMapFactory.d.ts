import { MapInstanceType } from "../data/Data";
import { GameMapInstance } from "./GameMapInstance";
export declare class GameMapFactory {
    static createInstance(instanceType: MapInstanceType): GameMapInstance;
    static createMap(): void;
}
