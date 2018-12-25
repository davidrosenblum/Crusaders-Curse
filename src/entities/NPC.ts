import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { Player } from "./Player";

export interface NPCConfig extends CasterObjectConfig{
    xpValue?:number;
    goldValue?:number;
}

export class NPC extends CasterObject{
    private _xpValue:number;
    private _goldValue:number;
    private _hasGivenBounty:boolean;

    constructor(config:NPCConfig){
        super(config);

        this._xpValue = config.xpValue;
        this._goldValue = config.goldValue;
        this._hasGivenBounty = false;
    }

    public giveBounty(players:{[id:string]: Player}):void{
        if(!this._hasGivenBounty){
            for(let player in players){
                players[player].addXP(this.xpValue);
                players[player].addGold(this.goldValue);
            }

            this._hasGivenBounty = true;
        }
    }

    public get xpValue():number{
        return this._xpValue;
    }

    public get goldValue():number{
        return this._goldValue;
    }
}