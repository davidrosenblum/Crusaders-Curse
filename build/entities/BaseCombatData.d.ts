import { GameObject, GameObjectConfig } from "./GameObject";
export interface CombatObjectConfig extends GameObjectConfig {
    health?: number;
    healthRegen?: number;
    mana?: number;
    manaRegen?: number;
    damageMultiplier?: number;
    defense?: CombatDefense;
    resistance?: CombatResistance;
}
export interface CombatDefense {
    melee: number;
    ranged: number;
}
export interface CombatResistance {
    physical: number;
    magical: number;
}
export declare abstract class CombatObject extends GameObject {
    static readonly HEALTH_CAP: number;
    static readonly HEALTH_REGEN_CAP: number;
    static readonly MANA_CAP: number;
    static readonly MANA_REGEN_CAP: number;
    static readonly DEFENSE_CAP: number;
    static readonly RESISTANCE_CAP: number;
    private _baseHealth;
    private _baseHealthRegen;
    private _baseMana;
    private _baseManaRegen;
    private _baseDefense;
    private _baseResistance;
    constructor(config: CombatObjectConfig);
    baseHealth: number;
    baseHealthRegen: number;
    baseMana: number;
    baseManaRegen: number;
    baseMeleeDefense: number;
    baseRangedDefense: number;
    basePhysicalResistance: number;
    baseMagicalResistance: number;
}
