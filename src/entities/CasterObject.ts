import { CombatObject, CombatObjectConfig } from "./CombatObject";
import { MapInstance } from "../maps/MapInstance";

export interface CasterObjectConfig extends CombatObjectConfig{
    abilities:{[ability:string]: number};
}

export abstract class CasterObject extends CombatObject{
    private _abilities:{[abiliy:string]: number};
    private _map:MapInstance;

    constructor(config:CasterObjectConfig){
        super(config);

        this._abilities = {};

        for(let ability in config.abilities){
            this.learnAbility(ability, config.abilities[ability]);
        }

        this._map = null;
    }

    public learnAbility(abilityName:string, level:number=1):void{
        if(!this.hasAbility(abilityName)){
            this._abilities[abilityName] = null; // instantiate spell here! 
        }
    }

    public hasAbility(abilityName:string):boolean{
        return abilityName in this._abilities;
    }

    public setMap(map:MapInstance):void{
        if(map.addUnit(this)){
            this._map = map;
        }
    }

    public get map():MapInstance{
        return this._map;
    }
}