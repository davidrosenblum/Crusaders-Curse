import { CombatObject, CombatObjectConfig } from "./CombatObject";
import { MapInstance } from "../maps/MapInstance";
export interface CasterObjectConfig extends CombatObjectConfig {
    abilities: {
        [ability: string]: number;
    };
}
export declare abstract class CasterObject extends CombatObject {
    private _abilities;
    private _map;
    constructor(config: CasterObjectConfig);
    learnAbility(abilityName: string, level?: number): void;
    hasAbility(abilityName: string): boolean;
    setMap(map: MapInstance): void;
    readonly map: MapInstance;
}
