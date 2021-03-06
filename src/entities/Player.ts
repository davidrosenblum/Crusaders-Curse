import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { CharacterDocument } from "../database/collections/CharactersCollection";
import { Archetype, getArchetypeName } from "../data/Data";
import { GameObjectState } from "./GameObject";

export interface PlayerConfig extends CasterObjectConfig{
    archetype:string;
}

export interface Potions{
    health:number;
    mana:number;
    rage:number;
    luck:number;
    protection:number;
}

// for UI! 
export interface PlayerState extends GameObjectState{
    potions:Potions;
    abilities:{[name:string]: number};
}

export class Player extends CasterObject{
    public static readonly LEVEL_CAP:number = 50;
    public static readonly GOLD_CAP:number = 999999;
    public static readonly POTIONS_CAP:number = 9;

    private _level:number;
    private _xp:number;
    private _xpNeeded:number;
    private _gold:number;
    private _abilityPoints:number;
    private _archetype:string;
    private _potions:Potions;

    constructor(saveData:CharacterDocument, config:PlayerConfig){
        super(config);

        this._level = Math.min(0, Math.max(saveData.level, Player.LEVEL_CAP));
        this._xpNeeded = this.calcXPNeeded();
        this._xp = Math.min(0, Math.max(saveData.xp, this._xpNeeded));
        this._gold = Math.min(0, Math.max(saveData.gold, Player.GOLD_CAP));
        this._abilityPoints = Math.min(0, Math.max(saveData.ability_points, Player.LEVEL_CAP - this.level - 1));
        this._archetype = config.archetype;
        this._potions = {
            health:     Math.min(0, Math.max(saveData.potions.health, Player.POTIONS_CAP)),
            mana:       Math.min(0, Math.max(saveData.potions.mana, Player.POTIONS_CAP)),
            rage:       Math.min(0, Math.max(saveData.potions.rage, Player.POTIONS_CAP)),
            luck:       Math.min(0, Math.max(saveData.potions.luck, Player.POTIONS_CAP)),
            protection: Math.min(0, Math.max(saveData.potions.protection, Player.POTIONS_CAP))
        }
    }

    private calcXPNeeded():number{
        return (this.level + 1) * (this.level + 2);
    }

    private levelUp():void{
        if(this.level < Player.LEVEL_CAP){
            this._level++;
            this._xpNeeded = (this.level + 1) * (this.level + 2);
            this._xp = 0;
            this.addAbilityPoints(1);
            this.emit("level", {level: this.level});
        }
    }

    public addAbilityPoints(points:number):void{
        this._abilityPoints = Math.min(this.abilityPoints + points, Player.LEVEL_CAP - this.level);
        this.emit("ability-points", {abilityPoints: this.abilityPoints});
    }

    public addXP(xp:number):void{
        let xpRemaining:number = xp;

        this.emit("xp", {xp});

        while(xpRemaining >= this.xpToGo){
            xpRemaining -= this.xpToGo;
            this.levelUp();
        }

        this._xp += xpRemaining;
    }

    public addGold(gold:number):void{
        this._gold = Math.min(this.gold + gold, Player.GOLD_CAP);
        this.emit("gold", {gold});
    }

    public getPotions():Potions{
        return {
            health:     this._potions.health,
            mana:       this._potions.mana,
            rage:       this._potions.rage,
            luck:       this._potions.luck,
            protection: this._potions.protection
        };
    }

    public getPlayerState():PlayerState{
        let state:any = this.getState();
        
        state.level = this.level;
        state.abilities = this.getAbilities();
        state.potions = this.getPotions();

        return state as PlayerState;
    }

    public get xpToGo():number{
        return this._xpNeeded - this._xp;
    }

    public get level():number{
        return this._level;
    }

    public get xp():number{
        return this._xp;
    }

    public get xpNeeded():number{
        return this._xpNeeded;
    }

    public get gold():number{
        return this._gold;
    }

    public get abilityPoints():number{
        return this._abilityPoints;
    }

    public get archetype():string{
        return this._archetype;
    }
}