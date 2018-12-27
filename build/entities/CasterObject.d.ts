import { CombatObject, CombatObjectConfig } from "./CombatObject";
import { GameMap } from "../maps/GameMap";
export interface AbilityItem {
    name: string;
    level: number;
    recharge: number;
}
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
    setMap(map: GameMap): void;
    getAbilities(): {
        [ability: string]: AbilityItem;
    };
    readonly map: GameMap;
}
