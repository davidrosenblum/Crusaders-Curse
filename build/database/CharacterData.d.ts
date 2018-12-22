export interface CharacterDataPotions {
    health: number;
    mana: number;
    rage: number;
    luck: number;
    protection: number;
}
export interface CharacterDataLastMap {
    mapID: number;
    x: number;
    y: number;
}
export interface CharacterDataConfig {
    accountID: number;
    name: string;
    level: number;
    xp: number;
    gold: number;
    archetypeID: number;
    skin: number;
    potions: CharacterDataPotions;
    lastMap: CharacterDataLastMap;
}
export declare class CharacterData {
    private _accountID;
    private _name;
    private _level;
    private _xp;
    private _gold;
    private _skin;
    private _potions;
    private _lastMap;
    constructor(config: CharacterDataConfig);
    static fromDatabase(result: any): CharacterData;
    readonly accountID: number;
    readonly name: string;
    readonly level: number;
    readonly xp: number;
    readonly gold: number;
    readonly skin: number;
}
