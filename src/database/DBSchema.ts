export interface DBAccountSchema{
    accountID?:number;
    username:string;
    password:string;
    access_level:number;
    enabled:boolean;
    date_joined:number;
}

export interface DBSaltSchema{
    username:string;
    salt:string;
}

export interface DBCharacterPreviewSchema{
    name:string;
    level:number;
    archetype:string;
    map:string;
}

export interface DBCharacterSchema{
    account_id:number;
    name:string;
    level:number;
    xp:number;
    gold:number;
    archetype_id:number;
    abilities: {[ability:string]: number},
    potions: {
        health:number,
        mana:number,
        rage:number,
        luck:number,
        protection:number;
    },
    last_map: {
        map_id:number;
        x:number;
        y:number;
    }
    skin:number;
}

export function createDefaultCharacter(accountID:number, archetypeID:number, name:string, skin:number=1):DBCharacterSchema{
    return {
        account_id: accountID,
        name,
        level:      1,
        xp:         0,
        gold:       0,
        potions:    {
            health:     0,
            mana:       0,
            rage:       0,
            luck:       0,
            protection: 0
        },
        last_map: {
            map_id: 1,
            x:      -1,
            y:      -1
        },
        abilities: {},
        archetype_id: archetypeID,
        skin
    };
}