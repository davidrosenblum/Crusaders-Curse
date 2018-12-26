import { Ability, AbilityConfig } from "./Ability";
import { CombatResistance, CombatDefense } from "../entities/BaseCombatObject";
import { CasterObject } from "../entities/CasterObject";
export interface ModifierAbilityConfig extends AbilityConfig {
    maxHealth?: number;
    maxMana?: number;
    healthRegen?: number;
    manaRegen?: number;
    meleeDefense?: number;
    rangedDefense?: number;
    physicalResistance?: number;
    magicalResistance?: number;
    damage?: number;
    duration: number;
}
export declare abstract class ModifierAbility extends Ability {
    private _maxHealth;
    private _maxMana;
    private _healthRegen;
    private _manaRegen;
    private _defense;
    private _resistance;
    private _damage;
    private _duration;
    constructor(config: ModifierAbilityConfig);
    effect(target: CasterObject): boolean;
    readonly maxHealth: number;
    readonly maxMana: number;
    readonly healthRegen: number;
    readonly manaRegen: number;
    readonly defense: CombatDefense;
    readonly resistance: CombatResistance;
    readonly damage: number;
    readonly duration: number;
}
