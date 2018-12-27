import { NPC } from "./NPC";
import { NPCType } from "../data/Data";
import { Enforcer } from './npcs/Enforcer';
import { Paragon } from "./npcs/Paragon";

export interface NPCOptions{
    name?:string;
    x?:number;
    y?:number;
    anim?:string;
}

export class NPCFactory{
    public static createNPC(npcType:NPCType, options:NPCOptions={}):NPC{
        let {x, y, anim, name} = options;

        switch(npcType){
            case NPCType.PARAGON:
                return new Paragon(x, y, anim, name);
            case NPCType.ENFORCER:
                return new Enforcer(x, y, anim, name);
            default:
                return null;
        }
    }
}

