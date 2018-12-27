import { NPC } from "./NPC";
import { NPCType } from "../data/Data";
export interface NPCOptions {
    name?: string;
    x?: number;
    y?: number;
    anim?: string;
}
export declare class NPCFactory {
    static createNPC(npcType: NPCType, options?: NPCOptions): NPC;
}
