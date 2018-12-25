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

export const enum Map{
    CITY_OF_KINGS =       1,
    HINTERLANDS =         2,
    NORTHERN_RUINS =      3,
    DESERT_OASIS =        4,
    VOLCANIC_WASTELANDS = 5,
    THE_SCHISM =          6
};

export function getMapName(id:number):string{
    switch(id){
        case Map.CITY_OF_KINGS:
            return "City of Kings";
        case Map.HINTERLANDS:
            return "Hinterlands";
        case Map.NORTHERN_RUINS:
            return "Northern Ruins";
        case Map.DESERT_OASIS:
            return "Desert Oasis";
        case Map.VOLCANIC_WASTELANDS:
            return "Volcanic Wastelands";
        case Map.THE_SCHISM:
            return "The Schism";
        default:
            return "NOT_FOUND";   
    }
}

export const enum Instance{
    RAIDER_ENCAMPMENT = 1,
    ORC_STRONGHOLD =    2,
    ANCIENT_CATACOMBS = 3,
    FORBIDDEN_RUINS =   4,
    DESERTERS_BASTION = 5,
    OASIS_CATHEDRAL =   6,
    HELL_FORGE =        7,
    DEEP_MINES =        8
}

export function getInstanceName(id:number):string{
    switch(id){
        case Instance.RAIDER_ENCAMPMENT:
            return "Raider Encampment";
        case Instance.ORC_STRONGHOLD:
            return "Orc Stronghold";
        case Instance.ANCIENT_CATACOMBS:
            return "Ancient Catacombs";
        case Instance.FORBIDDEN_RUINS:
            return "Forbidden Ruins";
        case Instance.DESERTERS_BASTION:
            return "Deserters Bastion";
        case Instance.OASIS_CATHEDRAL:
            return "Oasis Cathedral";
        case Instance.HELL_FORGE:
            return "Hell Forge";
        case Instance.DEEP_MINES:
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

export const enum Team{
    KINGS_LEGION =  "kings-legion",
    RAIDERS =       "raiders",
    ORCS =          "orcs",
    UNDEAD =        "undead",
    DEMONS =        "demons",
    SEPARATISTS =   "separatists",
    CULTISTS =      "cultists",
    IMPERIALS =     "imperials"
}