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

    public cast(caster:CasterObject, target:CasterObject, targets:{[id:string]: CasterObject}):void{
        // validate the abiltiy is ready to cast
        if(!this.isReady){
            throw new Error("Ability still recharging.");
        }

        // validate has enough mana
        if(caster.mana < this.manaCost){
            throw new Error("Not enough mana.");
        }

        // validate target can be targetted
        if(!this.validateTarget(caster, target)){
            throw new Error("Invalid target.");
        }

        // validate in range
        if(!caster.inRange(target, this.range)){
            throw new Error("Target out of range.");
        }

        // consume mana and make ability no longer available
        target.useMana(this.manaCost);
        this._ready = false;

        // set recharge timeout 
        setTimeout(() => {
            this._ready = true;
            this.emit("recharged");
        }, this._recharge);

        // cast on primary target
        if(this.alwaysHit || !caster.rollDefense()){
            // hit - effect primary target (successful cast)
            this.effect(target);

            // multiple target abilities
            if(this.maxTargets > 1){
                this.castSubsequentTargets(caster, target, targets);
            }
        }
    }

    private castSubsequentTargets(caster:CasterObject, starterTarget:CasterObject, targets:{[id:string]: CasterObject}):void{
        let targetsRemaining:number = this.maxTargets - 1;
        
        for(let targetID in targets){
            let nextTarget:CasterObject = targets[targetID];

            if(targetsRemaining > 0){
                if(nextTarget === starterTarget){
                    continue;
                }
                
                if(caster.inRange(nextTarget, this.range) && this.validateTarget(caster, nextTarget)){
                    if(this.alwaysHit || !caster.rollDefense()){
                        this.effect(nextTarget);
                    }
                    
                    targetsRemaining--;
                }
            }
            else break;
        }
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