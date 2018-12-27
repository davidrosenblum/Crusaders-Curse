import { NPC } from "./NPC";
import { NPCType } from "../data/Data";
import { Enforcer } from './npcs/Enforcer';
import { Paragon } from "./npcs/Paragon";

export interface NPCOptions{
    name?:string;
    anim?:string;
    row?:number;
    col?:number;
}

export class NPCFactory{
    public static createNPC(npcType:NPCType, options:NPCOptions={}):NPC{
        let {row, col, anim, name} = options;

        switch(npcType){
            case NPCType.PARAGON:
                return new Paragon(col, row, anim, name);
            case NPCType.ENFORCER:
                return new Enforcer(col, row, anim, name);
            default:
                return null;
        }
    }
}

