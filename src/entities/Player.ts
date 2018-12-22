import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { DBCharacterSchema } from "../database/Schemas";
import { Archetype, getArchetypeName } from "../data/Data";

export interface PlayerConfig extends CasterObjectConfig{
    archetype:string;
}

export class Player extends CasterObject{
    public static readonly LEVEL_CAP:number = 50;
    public static readonly GOLD_CAP:number = 999999;

    private _level:number;
    private _xp:number;
    private _xpNeeded:number;
    private _gold:number;
    private _abilityPoints:number;
    private _archetype:string;

    private constructor(saveData:DBCharacterSchema, config:PlayerConfig){
        super(config);

        this._level = 1;
        this._xp = 0;
        this._gold = 0;
        this._abilityPoints = 0;
    }

    private levelUp():void{
        if(this.level < Player.LEVEL_CAP){
            this._xpNeeded = (this.level + 1) * (this.level + 2);
            this._xp = 0;
            this._level++;
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

    public static createRanger(saveData:DBCharacterSchema):Player{
        return new Player(saveData, {
            name: saveData.name,
            type: "player",
            archetype: getArchetypeName(Archetype.RANGER),
            health: 100,
            mana: 100,
            moveSpeed: 1,
        });
    }
}