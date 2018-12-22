import { BaseCombatObject, BaseCombatObjectConfig, CombatResistance, CombatDefense } from "./BaseCombatObject";
import { DamageType, AttackType } from "../data/Data";
import { RNG } from "../utils/RNG";

export interface CombatObjectConfig extends BaseCombatObjectConfig{}

export abstract class CombatObject extends BaseCombatObject{
    public static readonly DAMAGE_MULTIPLIER_CAP:number = 2.75;
    public static readonly DEFAULT_DURATION:number = 5000;
    public static readonly DEFENSE_ROLL_REQUIRED:number = 0.85;

    private _health:number;
    private _mana:number;
    private _healthModifier:number;
    private _healthRegenModifier:number;
    private _manaModifier:number;
    private _manaRegenModifier:number;
    private _defenseModifier:CombatDefense;
    private _resistanceModifier:CombatResistance;
    private _damageMultiplier:number;

    constructor(config:CombatObjectConfig){
        super(config);

        this._health = this.baseHealth;
        this._mana = this.baseMana;
        this.resetModifiers();
    }

    public takeDamage(damage:number, damageType:DamageType):boolean{
        if(!this.rollDefense()){
            if(damageType === DamageType.PHYSICAL){
                damage -= (damage * this.physicalResistance);
            }
            else if(damageType === DamageType.MAGICAL){
                damage -= (damage * this.magicalResistance);
            }

            this._health -= damage;
            this.emit("hurt", {damage});

            if(this.health <= 0){
                this.emit("death");
            }

            return true;
        }

        this.emit("dodge");
        
        return false;
    }

    public rollDefense(attackType:AttackType=null):boolean{
        let modifier:number = 0;

        if(attackType === AttackType.MELEE){
            modifier = this.meleeDefense;
        }
        else if(attackType === AttackType.RANGED){
            modifier = this.rangedDefense;
        }

        return RNG.nextNum() + modifier >= CombatObject.DEFENSE_ROLL_REQUIRED;
    }

    public resetModifiers():void{
        this._healthModifier = 0;
        this._healthRegenModifier = 0;
        this._manaModifier = 0;
        this._manaRegenModifier = 0;
        this._defenseModifier = {melee: 0, ranged: 0};
        this._resistanceModifier = {physical: 0, magical: 0};
        this._damageMultiplier = 1;

        this.emit("combat-update");
    }

    public modifyHealth(healthModifier:number, duration:number=CombatObject.DEFAULT_DURATION):void{
        this._healthModifier += healthModifier;

        setTimeout(() => {
            this._healthModifier -= healthModifier
            this.emit("combat-update", {healthModifier});
        }, duration);

        this.emit("combat-update", {healthModifier});
    }

    public modifyHealthRegen(healthRegenModifier:number, duration:number=CombatObject.DEFAULT_DURATION):void{
        this._healthRegenModifier += healthRegenModifier;

        setTimeout(() => {
            this._healthRegenModifier -= healthRegenModifier
            this.emit("combat-update", {healthRegenModifier});
        }, duration);

        this.emit("combat-update", {healthRegenModifier});
    }

    public modifyMana(manaModifier:number, duration:number=CombatObject.DEFAULT_DURATION):void{
        this._manaModifier += manaModifier;

        setTimeout(() => {
            this._manaModifier -= manaModifier
            this.emit("combat-update", {manaModifier});
        }, duration);

        this.emit("combat-update", {manaModifier});
    }

    public modifyManaRegen(manaRegenModifier:number, duration:number=CombatObject.DEFAULT_DURATION):void{
        this._manaRegenModifier += manaRegenModifier;

        setTimeout(() => {
            this._manaRegenModifier -= manaRegenModifier
            this.emit("combat-update", {manaRegenModifier});
        }, duration);

        this.emit("combat-update", {manaRegenModifier});
    }

    public modifyDefense(defenseModifier:number,  defenseType:AttackType|"all", duration:number=CombatObject.DEFAULT_DURATION):void{
        let melee:number = (defenseType ===  AttackType.MELEE || defenseType === "all") ? defenseModifier : 0;
        let ranged:number = (defenseType ===  AttackType.RANGED || defenseType === "all") ? defenseModifier : 0;

        this._defenseModifier.melee += melee;
        this._defenseModifier.ranged += ranged;

        setTimeout(() => {
            this._defenseModifier.melee -= melee;
            this._defenseModifier.ranged -= ranged;
            this.emit("combat-update", {meleeDefenseModifier: melee, rangedDefenseModifier: ranged});
        }, duration);

        this.emit("combat-update", {meleeDefenseModifier: melee, rangedDefenseModifier: ranged});
    }

    public modifyResistance(resistanceModifier:number,  resistanceType:DamageType|"all", duration:number=CombatObject.DEFAULT_DURATION):void{
        let physical:number = (resistanceType === DamageType.PHYSICAL || resistanceType === "all") ? resistanceModifier : 0;
        let magical:number = (resistanceType === DamageType.MAGICAL || resistanceType === "all") ? resistanceModifier : 0;

        this._resistanceModifier.physical += physical;
        this._resistanceModifier.magical += magical;

        setTimeout(() => {
            this._resistanceModifier.physical -= physical;
            this._resistanceModifier.magical -= magical;
            this.emit("combat-update", {physicalResistanceModifier: physical, magicalResistanceModifier: magical});
        }, duration);

        this.emit("combat-update", {physicalResistanceModifier: physical, magicalResistanceModifier: magical});
    }

    public modifyDamage(damageModifier:number, duration:number=CombatObject.DEFAULT_DURATION):void{
        this._damageMultiplier += damageModifier;

        setTimeout(() => {
            this._damageMultiplier -= damageModifier
            this.emit("combat-update", {damageModifier});
        }, duration);

        this.emit("combat-update", {damageModifier});
    }

    public get healthModifier():number{
        return this._healthModifier;
    }

    public get healthRegenModifier():number{
        return Math.max(0, this._healthRegenModifier);
    }

    public get manaModifier():number{
        return this._manaModifier;
    }

    public get manaRegenModifier():number{
        return Math.max(0, this._manaRegenModifier);
    }

    public get meleeDefenseModifier():number{
        return Math.max(0, this._defenseModifier.melee);
    }

    public get rangedDefenseModifier():number{
        return Math.max(0, this._defenseModifier.ranged);
    }

    public get physicalResistanceModifier():number{
        return Math.max(0, this._resistanceModifier.physical);
    }

    public get magicalResistanceModifier():number{
        return Math.max(0, this._resistanceModifier.magical);
    }

    public get damageMultiplier():number{
        return Math.min(this._damageMultiplier, CombatObject.DAMAGE_MULTIPLIER_CAP);
    }

    public get health():number{
        return Math.max(0, Math.min(this._health, this.healthCap));
    }

    public get healthCap():number{
        return Math.max(0, Math.min(this.baseHealth + this.healthModifier, CombatObject.HEALTH_CAP));
    }

    public get healthRegen():number{
        return Math.max(0, Math.min(this.baseHealthRegen + this.healthRegenModifier, CombatObject.HEALTH_REGEN_CAP));
    }

    public get mana():number{
        return Math.max(0, Math.min(this._mana, this.manaCap));
    }

    public get manaCap():number{
        return Math.max(0, Math.min(this.baseMana + this.manaModifier, CombatObject.MANA_CAP));
    }

    public get manaRegen():number{
        return Math.max(0, Math.min(this.baseManaRegen + this.manaRegenModifier, CombatObject.MANA_REGEN_CAP));
    }

    public get meleeDefense():number{
        return Math.max(0, Math.min(this.baseMeleeDefense + this.meleeDefenseModifier, CombatObject.DEFENSE_CAP));
    }

    public get rangedDefense():number{
        return Math.max(0, Math.min(this.baseRangedDefense + this.rangedDefenseModifier, CombatObject.DEFENSE_CAP));
    }

    public get physicalResistance():number{
        return Math.max(0, Math.min(this.basePhysicalResistance + this.physicalResistanceModifier, CombatObject.RESISTANCE_CAP));
    }

    public get magicalResistance():number{
        return Math.max(0, Math.min(this.baseMagicalResistance + this.magicalResistance, CombatObject.RESISTANCE_CAP));
    }
}