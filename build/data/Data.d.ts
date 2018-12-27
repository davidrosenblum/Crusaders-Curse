export declare const enum Archetype {
    KNIGHT = 10,
    CRUSADER = 11,
    TEMPLAR = 12,
    RANGER = 20,
    ASASSIN = 21,
    SENTINEL = 22,
    MAGE = 30,
    ARCANE_ENCHANTER = 31,
    BLOOD_MAGE = 32
}
export declare function getArchetypeName(id: number): string;
export declare const enum MapType {
    CENTRAL_CITY = 1,
    HINTERLANDS = 2,
    NORTHERN_RUINS = 3,
    DESERT_OASIS = 4,
    VOLCANIC_WASTELANDS = 5,
    THE_SCHISM = 6
}
export declare const getMapName: (id: number) => string;
export interface MapData {
    tileSize: number;
    background: number[][];
    midground: number[][];
    foreground?: number[][];
}
export declare const getMapData: (id: number) => MapData;
export declare const enum MapInstanceType {
    RAIDER_ENCAMPMENT = 1,
    ORC_STRONGHOLD = 2,
    ANCIENT_CATACOMBS = 3,
    FORBIDDEN_RUINS = 4,
    DESERTERS_BASTION = 5,
    OASIS_CATHEDRAL = 6,
    HELL_FORGE = 7,
    DEEP_MINES = 8
}
export declare const getInstanceName: (id: number) => string;
export declare const enum OpCode {
    ACCOUNT_LOGIN = 1,
    ACCOUNT_LOGOUT = 2,
    CHARACTER_LIST = 3,
    CHARACTER_CREATE = 4,
    CHARACTER_DELETE = 5,
    CHARACTER_SELECT = 6,
    ENTER_MAP = 7,
    ENTER_INSTANCE = 8,
    TRANSPORT_NODE_CREATE = 9,
    CHAT_MESSAGE = 10,
    OBJECT_CREATE = 11,
    OBJECT_DELETE = 12,
    OBJECT_UPDATE = 13,
    OBJECT_STATS = 14,
    EFFECT_CREATE = 15,
    ABILITY_LIST = 16,
    ABILITY_CAST = 17,
    ABILITY_PURCHASE = 18,
    POTION_LIST = 19,
    POTION_CONSUME = 20,
    POTION_PURCHASE = 21,
    PARTY_INVITE = 22,
    PARTY_ACCEPT = 23,
    PARTY_DECLINE = 24,
    PARTY_LEAVE = 25,
    PARTY_UPDATE = 26,
    SKIN_CHANGE = 27,
    INVALID_OPCODE = 99
}
export declare const enum Status {
    GOOD = 2,
    BAD = 4,
    ERR = 5
}
export declare const enum DamageType {
    PHYSICAL = 1,
    MAGICAL = 2
}
export declare const enum AttackType {
    MELEE = 1,
    RANGED = 2
}
export declare const enum NPCTier {
    STANDARD = 1,
    ELITE = 2,
    BOSS = 3
}
export declare const enum Team {
    KINGS_LEGION = "kings-legion",
    RAIDERS = "raiders",
    ORCS = "orcs",
    UNDEAD = "undead",
    DEMONS = "demons",
    SEPARATISTS = "separatists",
    CULTISTS = "cultists",
    IMPERIALS = "imperials"
}
