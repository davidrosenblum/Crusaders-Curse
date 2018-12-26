import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { CharacterDocument } from "../database/collections/CharactersCollection";
export interface PlayerConfig extends CasterObjectConfig {
    archetype: string;
}
export interface Potions {
    health: number;
    mana: number;
    rage: number;
    luck: number;
    protection: number;
}
export declare class Player extends CasterObject {
    static readonly LEVEL_CAP: number;
    static readonly GOLD_CAP: number;
    static readonly POTIONS_CAP: number;
    private _level;
    private _xp;
    private _xpNeeded;
    private _gold;
    private _abilityPoints;
    private _archetype;
    private _potions;
    constructor(saveData: CharacterDocument, config: PlayerConfig);
    private calcXPNeeded;
    private levelUp;
    addAbilityPoints(points: number): void;
    addXP(xp: number): void;
    addGold(gold: number): void;
    getPotionsList(): Potions;
    readonly xpToGo: number;
    readonly level: number;
    readonly xp: number;
    readonly xpNeeded: number;
    readonly gold: number;
    readonly abilityPoints: number;
    readonly archetype: string;
}
