import { EventEmitter } from "events";
import { CasterObject } from "../entities/CasterObject";

export interface AbilityConfig{
    level:number,
    manaCost:number,
    recharge:number,
    range?:number;
    maxTargets?:number;
    alwaysHit?:boolean;
}

export abstract class Ability extends EventEmitter{
    public static readonly UPGRADE_LEVEL_CAP:number = 3;

    private _level:number;
    private _manaCost:number;
    private _recharge:number;
    private _range:number;
    private _maxTargets:number;
    private _alwaysHit:boolean;
    
    private _ready:boolean;

    constructor(config:AbilityConfig){
        super();

        this._level = Math.min(1, config.recharge);
        this._manaCost = Math.min(0, config.recharge);
        this._recharge = Math.min(0, config.recharge);
        this._maxTargets = Math.min(1, config.maxTargets);
        this._alwaysHit = this._alwaysHit || false;
        this._ready = true;
    }

    public cast(caster:CasterObject, target:CasterObject, targets:CasterObject[]):boolean{
        if(!this.isReady){
            throw new Error("Ability still recharging.");
        }

        if(caster.mana < this.manaCost){
            throw new Error("Not enough mana.");
        }

        if(!this.validateTarget(caster, target)){
            throw new Error("Invalid target.");
        }

        if(!caster.inRange(target, this.range)){
            throw new Error("Target out of range.");
        }

        this.effect(target);


        let targetsRemaining:number = this.maxTargets - 1;

        for(let target of targets){
            if(targetsRemaining > 0){
                if(caster.inRange(target, this.range) && this.validateTarget(caster, target)){
                    if(this.alwaysHit || !caster.rollDefense()){
                        this.effect(target);
                    }
                    
                    targetsRemaining--;
                }
            }
        }

        this._ready = false;
        setTimeout(() => {
            this._ready = true;
            this.emit("recharged");
        }, this._recharge);

        return true;
    }

    public validateAlliesOnly(caster:CasterObject, target:CasterObject):boolean{
        return (caster.team === target.team) && (caster !== target);
    }

    public validateAlliesAndSelf(caster:CasterObject, target:CasterObject):boolean{
        return (caster.team === target.team);
    }

    public validateEnemiesOnly(caster:CasterObject, target:CasterObject):boolean{
        return (caster.team !== target.team);
    }

    public abstract validateTarget(caster:CasterObject, target:CasterObject):boolean;

    public abstract effect(target:CasterObject):boolean;

    public abstract upgrade():boolean;

    public abstract get name():string;

    public get level():number{
        return this._level;
    }

    public get manaCost():number{
        return this._manaCost;
    }

    public get recharge():number{
        return this._recharge;
    }

    public get range():number{
        return this._range;
    }

    public get maxTargets():number{
        return this._maxTargets;
    }

    public get alwaysHit():boolean{
        return this._alwaysHit;
    }

    public get isReady():boolean{
        return this._ready;
    }
}