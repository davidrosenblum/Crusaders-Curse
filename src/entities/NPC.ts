import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { Player } from "./Player";

export interface NPCConfig extends CasterObjectConfig{
    xpValue?:number;
    goldValue?:number;
}

export class NPC extends CasterObject{
    private _xpValue:number;
    private _goldValue:number;

    constructor(config:NPCConfig){
        super(config);

        this._xpValue = config.xpValue;
        this._goldValue = config.goldValue;
    }

    public giveBounty(players:{[id:string]: Player}):void{
        for(let player in players){
            players[player].addXP(this.xpValue);
            players[player].addGold(this.goldValue);
        }
    }

    public get xpValue():number{
        return this._xpValue;
    }

    public get goldValue():number{
        return this._goldValue;
    }
}