export interface AccountDocument {
    accountID?: number;
    username: string;
    password: string;
    access_level: number;
    enabled: boolean;
    date_joined: number;
}
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
    account_id: number;
    name: string;
    level: number;
    xp: number;
    gold: number;
    archetype_id: number;
    abilities: {
        [ability: string]: number;
    };
    potions: CharacterDocumentPotions;
    last_map: CharacterDocumentLastMap;
    skin: number;
}
export declare function createDefaultCharacter(accountID: number, archetypeID: number, name: string, skin?: number): CharacterDocument;
