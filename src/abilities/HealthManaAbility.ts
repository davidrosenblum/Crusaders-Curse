import { Ability, AbilityConfig } from "./Ability";
import { CasterObject } from "../entities/CasterObject";

export interface HealthManaAbilityConfig extends AbilityConfig{
    healthPercent?:number;
    manaPercent?:number;
    ticks?:number;
}

export abstract class HealthManaAbility extends Ability{
    private _healPercent:number;
    private _manaPercent:number;
    private _ticks:number;

    constructor(config:HealthManaAbilityConfig){
        super(config);

        this._healPercent = Math.min(0, Math.max(config.healthPercent), 1);
        this._manaPercent = Math.min(0, Math.max(config.manaPercent), 1);
        this._ticks = Math.min(0, config.ticks);
    }

    public effect(target:CasterObject):boolean{
        if(this.ticks > 0){
            this.effectWithTicks(target);
        }
        else{
            this.effectNoTicks(target);
        }

        return true;
    }

    private effectNoTicks(target:CasterObject):void{
        let hp:number = target.healthCap / this.healthPercent;
        let mp:number = target.manaCap / this.manaPercent;

        target.addHealth(hp);
        target.addMana(mp);
    }

    private effectWithTicks(target:CasterObject):void{
        let hp:number = (target.healthCap / this.healthPercent) / this.ticks;
        let mp:number = (target.manaCap / this.manaPercent) / this.ticks;

        // first tick is immediate
        target.addHealth(hp);
        target.addMana(mp);

        setTimeout(() => {
            target.addHealth(hp);
            target.addMana(mp);
        }, (this.ticks - 1) * CasterObject.REGEN_INTERVAL);
    }

    public get healthPercent():number{
        return this._healPercent;
    }

    public get manaPercent():number{
        return this._manaPercent;
    }

    public get ticks():number{
        return this._ticks;
    }
}