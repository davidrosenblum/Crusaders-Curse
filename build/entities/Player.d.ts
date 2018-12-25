import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { CharacterDocument } from "../database/collections/CharactersCollection";
export interface PlayerConfig extends CasterObjectConfig {
    archetype: string;
}
export declare class Player extends CasterObject {
    static readonly LEVEL_CAP: number;
    static readonly GOLD_CAP: number;
    private _level;
    private _xp;
    private _xpNeeded;
    private _gold;
    private _abilityPoints;
    private _archetype;
    constructor(saveData: CharacterDocument, config: PlayerConfig);
    private calcXPNeeded;
    private levelUp;
    addAbilityPoints(points: number): void;
    addXP(xp: number): void;
    addGold(gold: number): void;
    readonly xpToGo: number;
    readonly level: number;
    readonly xp: number;
    readonly xpNeeded: number;
    readonly gold: number;
    readonly abilityPoints: number;
    readonly archetype: string;
}
