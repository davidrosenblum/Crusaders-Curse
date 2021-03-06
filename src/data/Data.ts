import { MAP_DATA } from "./MapData";

export const enum Archetype{
    KNIGHT =            10,
    CRUSADER =          11,
    TEMPLAR =           12,
    RANGER =            20,
    ASASSIN =           21,
    SENTINEL =          22,
    MAGE =              30,
    ARCANE_ENCHANTER =  31,
    BLOOD_MAGE =        32
};

export function getArchetypeName(id:number):string{
    switch(id){
        case Archetype.KNIGHT:
            return "Knight";
        case Archetype.CRUSADER:
            return "Crusader";
        case Archetype.TEMPLAR:
            return "Templar";
        case Archetype.RANGER:
            return "Ranger";
        case Archetype.ASASSIN:
            return "Assassin";
        case Archetype.SENTINEL:
            return "Sentinel";
        case Archetype.MAGE:
            return "Mage";
        case Archetype.ARCANE_ENCHANTER:
            return "Arcane Enchanter";
        case Archetype.BLOOD_MAGE:
            return "Blood Mage";
        default:
            return "NOT_FOUND";
    }
}

export const enum MapType{
    CENTRAL_CITY =        1,
    HINTERLANDS =         2,
    NORTHERN_RUINS =      3,
    DESERT_OASIS =        4,
    VOLCANIC_WASTELANDS = 5,
    THE_SCHISM =          6
};

export const getMapName = function(id:number):string{
    switch(id){
        case MapType.CENTRAL_CITY:
            return "Central City";
        case MapType.HINTERLANDS:
            return "Hinterlands";
        case MapType.NORTHERN_RUINS:
            return "Northern Ruins";
        case MapType.DESERT_OASIS:
            return "Desert Oasis";
        case MapType.VOLCANIC_WASTELANDS:
            return "Volcanic Wastelands";
        case MapType.THE_SCHISM:
            return "The Schism";
        default:
            return "NOT_FOUND";   
    }
}

export interface MapData{
    background:number[][],
    midground:number[][],
    foreground?:number[][]
}

export const getMapData = function(name:string):MapData{
    return MAP_DATA[name] || null;
}

export const enum MapInstanceType{
    RAIDER_ENCAMPMENT = 1,
    ORC_STRONGHOLD =    2,
    ANCIENT_CATACOMBS = 3,
    FORBIDDEN_RUINS =   4,
    DESERTERS_BASTION = 5,
    OASIS_CATHEDRAL =   6,
    HELL_FORGE =        7,
    DEEP_MINES =        8
}

export const getInstanceName = function(id:number):string{
    switch(id){
        case MapInstanceType.RAIDER_ENCAMPMENT:
            return "Raider Encampment";
        case MapInstanceType.ORC_STRONGHOLD:
            return "Orc Stronghold";
        case MapInstanceType.ANCIENT_CATACOMBS:
            return "Ancient Catacombs";
        case MapInstanceType.FORBIDDEN_RUINS:
            return "Forbidden Ruins";
        case MapInstanceType.DESERTERS_BASTION:
            return "Deserters Bastion";
        case MapInstanceType.OASIS_CATHEDRAL:
            return "Oasis Cathedral";
        case MapInstanceType.HELL_FORGE:
            return "Hell Forge";
        case MapInstanceType.DEEP_MINES:
            return "Hell Forge";
        default:
            return "NOT_FOUND";   
    }
}

export const enum OpCode{
    ACCOUNT_LOGIN =         1,
    ACCOUNT_LOGOUT =        2,
    CHARACTER_LIST =        3,
    CHARACTER_CREATE =      4,
    CHARACTER_DELETE =      5,
    CHARACTER_SELECT =      6,
    ENTER_MAP =             7,
    ENTER_INSTANCE =        8,
    TRANSPORT_NODE_CREATE = 9,
    CHAT_MESSAGE =          10,
    OBJECT_CREATE =         11,
    OBJECT_DELETE =         12,
    OBJECT_UPDATE =         13,
    OBJECT_STATS =          14,
    EFFECT_CREATE =         15,
    ABILITY_LIST =          16,
    ABILITY_CAST =          17,
    ABILITY_PURCHASE =      18,
    POTION_LIST =           19,
    POTION_CONSUME =        20,
    POTION_PURCHASE =       21,
    PARTY_INVITE =          22,
    PARTY_ACCEPT =          23,
    PARTY_DECLINE =         24,
    PARTY_LEAVE =           25,
    PARTY_UPDATE =          26,
    SKIN_CHANGE =           27,
    INVALID_OPCODE =        99
}

export const enum Status{
    GOOD =  2,
    BAD =   4,
    ERR =   5
}

export const enum DamageType{
    PHYSICAL =  1,
    MAGICAL =   2
}

export const enum AttackType{
    MELEE =     1,
    RANGED =    2
}

export const enum NPCTier{
    STANDARD =  1,
    ELITE =     2,
    BOSS =      3
}

export const enum NPCType{
    GUARD =             "guard",
    VANGUARD =          "vanguard",
    ROYAL_GUARD =       "royal-guard",
    PARAGON =           "paragon",
    ENFORCER =          "enforcer",
    ARSONIST =          "arstonist",
    MARAUDER =          "marauder",
    RENEGADE_MAGE =     "renegade-mage",
    OVERSEER =          "overseer",
    WARRIOR =           "warrior",
    BRUTE =             "brute",
    CHIEFTAIN =         "chieftain",
    REANIMATED_CORPSE = "reanimated-corpse",
    ANIMUS =            "animus",
    GRAVE_KNIGHT =      "grave-knight",
    LICH =              "lich",
    DEATH_KNIGHT =      "death-knight"
}

export const enum Team{
    KINGS_LEGION =  "King's Legion",
    RAIDERS =       "Raiders",
    ORCS =          "Orcs",
    UNDEAD =        "Undead",
    DEMONS =        "Demons",
    SEPARATISTS =   "Separatists",
    CULTISTS =      "Cultists",
    IMPERIALS =     "Imperials"
}