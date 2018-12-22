import { BaseCombatObject, BaseCombatObjectConfig } from "./BaseCombatObject";
import { DamageType, AttackType } from "../data/Data";
export interface CombatObjectConfig extends BaseCombatObjectConfig {
}
export declare abstract class CombatObject extends BaseCombatObject {
    static readonly DAMAGE_MULTIPLIER_CAP: number;
    static readonly DEFAULT_DURATION: number;
    static readonly DEFENSE_ROLL_REQUIRED: number;
    private _health;
    private _mana;
    private _healthModifier;
    private _healthRegenModifier;
    private _manaModifier;
    private _manaRegenModifier;
    private _defenseModifier;
    private _resistanceModifier;
    private _damageMultiplier;
    constructor(config: CombatObjectConfig);
    takeDamage(damage: number, damageType: DamageType): boolean;
    rollDefense(attackType?: AttackType): boolean;
    resetModifiers(): void;
    modifyHealth(healthModifier: number, duration?: number): void;
    modifyHealthRegen(healthRegenModifier: number, duration?: number): void;
    modifyMana(manaModifier: number, duration?: number): void;
    modifyManaRegen(manaRegenModifier: number, duration?: number): void;
    modifyDefense(defenseModifier: number, defenseType: AttackType | "all", duration?: number): void;
    modifyResistance(resistanceModifier: number, resistanceType: DamageType | "all", duration?: number): void;
    modifyDamage(damageModifier: number, duration?: number): void;
    readonly healthModifier: number;
    readonly healthRegenModifier: number;
    readonly manaModifier: number;
    readonly manaRegenModifier: number;
    readonly meleeDefenseModifier: number;
    readonly rangedDefenseModifier: number;
    readonly physicalResistanceModifier: number;
    readonly magicalResistanceModifier: number;
    readonly damageMultiplier: number;
    readonly health: number;
    readonly healthCap: number;
    readonly healthRegen: number;
    readonly mana: number;
    readonly manaCap: number;
    readonly manaRegen: number;
    readonly meleeDefense: number;
    readonly rangedDefense: number;
    readonly physicalResistance: number;
    readonly magicalResistance: number;
}
