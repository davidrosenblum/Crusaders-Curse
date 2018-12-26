import { GameObject, GameObjectConfig } from "./GameObject";

export interface BaseCombatObjectConfig extends GameObjectConfig{
    health?:number;
    healthRegen?:number;
    mana?:number;
    manaRegen?:number;
    damageMultiplier?:number;
    defense?:CombatDefense;
    resistance?:CombatResistance;
}

export interface BaseCombatStats{
    baseHealth:number;
    baseHealthRegen:number;
    baseMana:number;
    baseManaRegen:number;
    baseMeleeDefense:number;
    baseRangedDefense:number;
    basePhysicalResistance:number;
    baseMagicalResistance:number;
}

export interface CombatDefense{
    melee:number;
    ranged:number;
}

export interface CombatResistance{
    physical:number;
    magical:number;
}

export abstract class BaseCombatObject extends GameObject{
    public static readonly HEALTH_CAP:number =          9999;
    public static readonly HEALTH_REGEN_CAP:number =    0.10;
    public static readonly MANA_CAP:number =            9999;
    public static readonly MANA_REGEN_CAP:number =      0.10;
    public static readonly DEFENSE_CAP:number =         0.45;
    public static readonly RESISTANCE_CAP:number =      0.90;

    private _baseHealth:number;
    private _baseHealthRegen:number;
    private _baseMana:number;
    private _baseManaRegen:number;
    private _baseDefense:CombatDefense;
    private _baseResistance:CombatResistance;

    constructor(config:BaseCombatObjectConfig){
        super(config);

        this.baseHealth = config.health || 1;
        this.baseHealthRegen = config.healthRegen || 0.02;

        this.baseMana = config.mana || 1;
        this.baseManaRegen = config.manaRegen;

        this._baseDefense = {melee: 0, ranged: 0};
        this.baseMeleeDefense = config.defense.melee || 0;
        this.baseRangedDefense = config.defense.ranged || 0;

        this._baseResistance = {physical: 0, magical: 0};
        this.basePhysicalResistance = config.resistance.physical || 0;
        this.baseMagicalResistance = config.resistance.magical || 0;
    }

    public getBaseCombatStats():BaseCombatStats{
        return {
            baseHealth:             this.baseHealth,
            baseHealthRegen:        this.baseHealthRegen,
            baseMana:               this.baseMana,
            baseManaRegen:          this.baseManaRegen,
            baseMeleeDefense:       this.baseMeleeDefense,
            baseRangedDefense:      this.baseRangedDefense,
            basePhysicalResistance: this.basePhysicalResistance,
            baseMagicalResistance:  this.baseMagicalResistance
        };
    }

    public set baseHealth(baseHealth:number){
        this._baseHealth = Math.max(0, Math.min(baseHealth, BaseCombatObject.HEALTH_CAP));
        this.emit("combat-update", {baseHealth});
    }

    public set baseHealthRegen(baseHealthRegen:number){
        this._baseHealthRegen = Math.max(0, Math.min(baseHealthRegen, BaseCombatObject.HEALTH_REGEN_CAP));
        this.emit("combat-update", {baseHealthRegen});
    }

    public set baseMana(baseMana:number){
        this._baseMana = Math.max(0, Math.min(baseMana, BaseCombatObject.MANA_CAP));
        this.emit("combat-update", {baseMana});
    }

    public set baseManaRegen(baseManaRegen:number){
        this._baseManaRegen = Math.max(0, Math.min(baseManaRegen, BaseCombatObject.HEALTH_REGEN_CAP));
        this.emit("combat-update", {baseManaRegen});
    }

    public set baseMeleeDefense(baseMeleeDefense:number){
        this._baseDefense.melee = Math.max(0, Math.min(baseMeleeDefense, BaseCombatObject.DEFENSE_CAP));
        this.emit("combat-update", {baseMeleeDefense});
    }

    public set baseRangedDefense(baseRangedDefense:number){
        this._baseDefense.ranged = Math.max(0, Math.min(baseRangedDefense, BaseCombatObject.DEFENSE_CAP));
        this.emit("combat-update", {baseRangedDefense});
    }

    public set basePhysicalResistance(basePhysicalResistance:number){
        this._baseResistance.physical = Math.max(0, Math.min(basePhysicalResistance, BaseCombatObject.RESISTANCE_CAP));
        this.emit("combat-update", {basePhysicalResistance});
    }

    public set baseMagicalResistance(baseMagicalResistance:number){
        this._baseResistance.physical = Math.max(0, Math.min(baseMagicalResistance, BaseCombatObject.RESISTANCE_CAP));
        this.emit("combat-update", {baseMagicalResistance});
    }

    public get baseHealth():number{
        return this._baseHealth;
    }

    public get baseHealthRegen():number{
        return this._baseHealthRegen;
    }

    public get baseMana():number{
        return this._baseMana;
    }

    public get baseManaRegen():number{
        return this._baseManaRegen;
    }

    public get baseMeleeDefense():number{
        return this._baseDefense.melee;
    }

    public get baseRangedDefense():number{
        return this._baseDefense.ranged;
    }

    public get basePhysicalResistance():number{
        return this._baseResistance.physical;
    }

    public get baseMagicalResistance():number{
        return this._baseResistance.magical;
    }
}