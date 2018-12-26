import { Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject } from "mongodb";
export interface CharacterPreviewDocument {
    name: string;
    level: number;
    archetype: string;
    map: string;
}
export interface CharacterDocumentPotions {
    health: number;
    mana: number;
    rage: number;
    luck: number;
    protection: number;
}
export interface CharacterDocumentLastMap {
    map_id: number;
    x: number;
    y: number;
}
export interface CharacterDocument {
    account_id: string;
    name: string;
    level: number;
    xp: number;
    gold: number;
    ability_points: number;
    archetype_id: number;
    abilities: {
        [ability: string]: number;
    };
    potions: CharacterDocumentPotions;
    last_map: CharacterDocumentLastMap;
    skin: number;
}
export declare class CharactersCollection {
    static createCharacter(database: Db, accountID: string, archetypeID: number, name: string, skin?: number): Promise<InsertOneWriteOpResult>;
    static deleteCharacter(database: Db, accountID: string, name: string): Promise<DeleteWriteOpResultObject>;
    static getCharacter(database: Db, accountID: string, name: string): Promise<CharacterDocument>;
    static getCharacterList(database: Db, accountID: string): Promise<CharacterPreviewDocument[]>;
    static updateCharacter(database: Db, data: CharacterDocument): Promise<FindAndModifyWriteOpResultObject>;
}
