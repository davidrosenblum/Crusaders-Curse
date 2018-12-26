export const OpCode = {
    ACCOUNT_LOGIN:          1,
    ACCOUNT_LOGOUT:         2,
    CHARACTER_LIST:         3,
    CHARACTER_CREATE:       4,
    CHARACTER_DELETE:       5,
    CHARACTER_SELECT:       6,
    ENTER_MAP:              7,
    ENTER_INSTANCE:         8,
    TRANSPORT_NODE_CREATE:  9,
    CHAT_MESSAGE:           10,
    OBJECT_CREATE:          11,
    OBJECT_DELETE:          12,
    OBJECT_UPDATE:          13,
    OBJECT_STATS:           14,
    EFFECT_CREATE:          15,
    ABILITY_LIST:           16,
    ABILITY_CAST:           17,
    ABILITY_PURCHASE:       18,
    POTION_LIST:            19,
    POTION_CONSUME:         20,
    POTION_PURCHASE:        21,
    PARTY_INVITE:           22,
    PARTY_ACCEPT:           23,
    PARTY_DECLINE:          24,
    PARTY_LEAVE:            25,
    PARTY_UPDATE:           26,
    SKIN_CHANGE:            27,
    INVALID_OPCODE:         99
};  

export const Status = {
    GOOD:   2,
    BAD:    4,
    ERR:    5
};

export const MSG_DELIM = "?&?";