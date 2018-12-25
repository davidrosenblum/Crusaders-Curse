import { CombatObject, CombatObjectConfig } from "./CombatObject";
export interface CasterObjectConfig extends CombatObjectConfig {
    abilities: {
        [ability: string]: number;
    };
}
export declare abstract class CasterObject extends CombatObject {
    private _abilities;
    constructor(config: CasterObjectConfig);
    learnAbility(abilityName: string, level?: number): void;
    hasAbility(abilityName: string): boolean;
}
