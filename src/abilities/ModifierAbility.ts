import { Ability, AbilityConfig } from "./Ability";
import { CombatResistance, CombatDefense } from "../entities/BaseCombatObject";
import { CasterObject } from "../entities/CasterObject";
import { DamageType, AttackType } from "../data/Data";

export interface ModifierAbilityConfig extends AbilityConfig{
    maxHealth?:number;
    maxMana?:number;
    healthRegen?:number;
    manaRegen?:number;
    meleeDefense?:number;
    rangedDefense?:number;
    physicalResistance?:number;
    magicalResistance?:number;
    damage?:number;
    duration:number;
}

export abstract class ModifierAbility extends Ability{
    private _maxHealth:number;
    private _maxMana:number;
    private _healthRegen:number;
    private _manaRegen:number;
    private _defense:CombatDefense;
    private _resistance:CombatResistance;
    private _damage:number;
    private _duration:number;

    constructor(config:ModifierAbilityConfig){
        super(config);

        this._maxHealth = config.maxHealth || 0;
        this._maxMana = config.maxMana || 0;
        this._healthRegen = config.healthRegen || 0;
        this._manaRegen = config.manaRegen || 0;
        this._defense = {
            melee: config.meleeDefense || 0,
            ranged: config.rangedDefense || 0
        };
        this._resistance = {
            physical: config.physicalResistance || 0,
            magical: config.magicalResistance || 0
        };
        this._damage = config.damage || 0;
        this._duration = Math.min(0, config.duration);
    }

    public effect(target:CasterObject):boolean{
        if(this.alwaysHit || !target.rollDefense()){
            if(this.maxHealth !== 0){
                target.modifyHealth(this.maxHealth, this.duration);
            }
            if(this.maxMana !== 0){
                target.modifyHealth(this.maxMana, this.duration);
            }
            if(this.healthRegen !== 0){
                target.modifyHealthRegen(this.healthRegen, this.duration);
            }
            if(this.manaRegen !== 0){
                target.modifyManaRegen(this.manaRegen, this.duration);
            }
            if(this.defense.melee !== 0){
                target.modifyDefense(this.defense.melee, AttackType.MELEE, this.duration);
            }
            if(this.defense.ranged !== 0){
                target.modifyDefense(this.defense.ranged, AttackType.RANGED, this.duration);
            }
            if(this.resistance.physical !== 0){
                target.modifyResistance(this.resistance.magical, DamageType.PHYSICAL, this.duration);
            }
            if(this.resistance.magical !== 0){
                target.modifyResistance(this.resistance.magical, DamageType.MAGICAL, this.duration);
            }
            if(this.damage !== 0){
                target.modifyDamage(this.damage, this.duration);
            }
            return true;
        }
        return false;
    }

    public get maxHealth():number{
        return this._maxHealth;
    }

    public get maxMana():number{
        return this._maxMana;
    }

    public get healthRegen():number{
        return this._healthRegen;
    }

    public get manaRegen():number{
        return this._manaRegen;
    }

    public get defense():CombatDefense{
        return this._defense;
    }

    public get resistance():CombatResistance{
        return this._resistance;
    }

    public get damage():number{
        return this._damage;
    }

    public get duration():number{
        return this._duration;
    }
}