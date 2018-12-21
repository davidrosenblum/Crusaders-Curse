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
export declare const enum Map {
    CITY_OF_KINGS = 1,
    HINTERLANDS = 2,
    NORTHERN_RUINS = 3,
    DESERT_OASIS = 4,
    VOLCANIC_WASTELANDS = 5,
    THE_SCHISM = 6
}
export declare function getMapName(id: number): string;
export declare const enum Instance {
    RAIDER_ENCAMPMENT = 1,
    ORC_STRONGHOLD = 2,
    ANCIENT_CATACOMBS = 3,
    FORBIDDEN_RUINS = 4,
    DESERTERS_BASTION = 5,
    OASIS_CATHEDRAL = 6,
    HELL_FORGE = 7,
    DEEP_MINES = 8
}
export declare function getInstanceName(id: number): string;
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
    EFFECT_CREATE = 14,
    ABILITY_LIST = 15,
    ABILITY_CAST = 16,
    ABILITY_PURCHASE = 17,
    POTION_LIST = 18,
    POTION_CONSUME = 19,
    POTION_PURCHASE = 20,
    PARTY_INVITE = 21,
    PARTY_ACCEPT = 21,
    PARTY_DECLINE = 22,
    PARTY_LEAVE = 23,
    PARTY_UPDATE = 24
}
export declare const enum Status {
    GOOD = 2,
    BAD = 4,
    ERR = 5
}
