import { CombatObject, CombatObjectConfig } from "./CombatObject";
import { GameMap } from "../maps/GameMap";
import { Ability } from "../abilities/Ability";

export interface AbilityItem{
    name:string;
    level:number;
    recharge:number;
}

export interface CasterObjectConfig extends CombatObjectConfig{
    abilities:{[ability:string]: number};
}

export abstract class CasterObject extends CombatObject{
    private _abilities:{[ability:string]: Ability};
    private _map:GameMap;

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

    public castAbility(abilityName:string, target:CasterObject, targets:{[id:string]: CasterObject}):void{
        if(this.hasAbility(abilityName)){
            let ability:Ability = this._abilities[abilityName];

            ability.cast(this, target, targets);
        }
        else throw new Error(`Ability cast error - missing ability "${abilityName}".`);
    }

    public setMap(map:GameMap):void{
        if(map.addUnit(this) || map.hasUnit(this)){
            this._map = map;
        }
    }

    public getAbilities():{[ability:string]: AbilityItem}{
        let abilityList = {};

        for(let abilityName in this._abilities){
            let currAbility:Ability = this._abilities[abilityName];

            abilityList[abilityName] = {
                name:       currAbility.name,
                level:      currAbility.level,
                recharge:   currAbility.recharge
            };
        }

        return abilityList;
    }

    public get map():GameMap{
        return this._map;
    }
}