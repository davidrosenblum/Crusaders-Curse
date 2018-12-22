import { Db, InsertWriteOpResult } from "mongodb";
import { Team } from "../../data/Data";
export interface NPCDocument {
    type: string;
    name: string;
    move_speed: number;
    team?: Team;
    tier: number;
    health: {
        base: number;
        regen?: number;
    };
    mana: {
        base: number;
        regen?: number;
    };
    defense: {
        melee: number;
        ranged: number;
    };
    resistance: {
        physical: number;
        magical: number;
    };
    bounty: {
        xp: number;
        gold: number;
    };
    abilities?: {
        [ability: string]: number;
    };
}
export declare class NPCsCollection {
    static loadFromDatabase(database: Db): Promise<NPCDocument[]>;
    static insertDefaults(database: Db): Promise<InsertWriteOpResult>;
    private static defaultNPCs;
}
