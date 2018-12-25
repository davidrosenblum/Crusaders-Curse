import { CombatObject, CombatObjectConfig } from "./CombatObject";

export interface CasterObjectConfig extends CombatObjectConfig{
    abilities:{[ability:string]: number};
}

export abstract class CasterObject extends CombatObject{
    private _abilities:{[abiliy:string]: number};

    constructor(config:CasterObjectConfig){
        super(config);

        this._abilities = {};

        for(let ability in config.abilities){
            this.learnAbility(ability, config.abilities[ability]);
        }
    }

    public learnAbility(abilityName:string, level:number=1):void{
        if(!this.hasAbility(abilityName)){
            this._abilities[abilityName] = null; // instantiate spell here! 
        }
    }

    public hasAbility(abilityName:string):boolean{
        return abilityName in this._abilities;
    }
}