import { NPC } from "./NPC";
import { NPCType } from "../data/Data";
export interface NPCOptions {
    name?: string;
    anim?: string;
    row?: number;
    col?: number;
}
export declare class NPCFactory {
    static createNPC(npcType: NPCType, options?: NPCOptions): NPC;
}
