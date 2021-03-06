import { Db, InsertWriteOpResult } from "mongodb";
import { Team, NPCTier, NPCType } from "../../data/Data";

export interface NPCDocument{
    type:string;
    name:string;
    move_speed:number;
    team?:Team;
    tier:number;
    health: {base:number, regen?:number};
    mana: {base:number, regen?:number};
    defense: {melee:number, ranged:number};
    resistance: {physical:number, magical:number};
    bounty: {xp:number, gold:number};
    abilities?: {[ability:string]: number};
}

export class NPCsCollection{
    public static loadFromDatabase(database:Db):Promise<NPCDocument[]>{
        return new Promise((resolve, reject) => {
            database.collection("npcs").find({}).toArray()
                .then(results => resolve(results))
                .catch(err => reject(err));
        });
    }

    public static insertDefaults(database:Db):Promise<InsertWriteOpResult>{
        return database.collection("npcs").insertMany(NPCsCollection.defaultNPCs)
    }

    private static defaultNPCs:NPCDocument[] = [
        {
            type:           NPCType.ENFORCER,
            name:           "Enforcer",
            move_speed:     2,
            team:           Team.RAIDERS,
            tier:           NPCTier.STANDARD,
            health:         {base: 32, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0.10, magical: 0},
            bounty:         {xp: 5, gold: 2},
            abilities:      {}
        },
        {
            type:           NPCType.ARSONIST,
            name:           "Arsonist",
            move_speed:     2,
            team:           Team.RAIDERS,
            tier:           NPCTier.STANDARD,
            health:         {base: 25, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0, magical: 0},
            bounty:         {xp: 5, gold: 2},
            abilities:      {}
        },
        {
            type:           NPCType.MARAUDER,
            name:           "Marauder",
            move_speed:     2,
            team:           Team.RAIDERS,
            tier:           NPCTier.ELITE,
            health:         {base: 65, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0.25, magical: 0},
            bounty:         {xp: 11, gold: 6},
            abilities:      {}
        },
        {
            type:           NPCType.RENEGADE_MAGE,
            name:           "Renegade Mage",
            move_speed:     2,
            team:           Team.RAIDERS,
            tier:           NPCTier.ELITE,
            health:         {base: 50, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0, magical: 0.33},
            bounty:         {xp: 11, gold: 6},
            abilities:      {}
        },
        {
            type:           NPCType.OVERSEER,
            name:           "Overseer",
            move_speed:     1,
            team:           Team.RAIDERS,
            tier:           NPCTier.BOSS,
            health:         {base: 135, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0.10, ranged: 0.10},
            resistance:     {physical: 0.25, magical: 0.15},
            bounty:         {xp: 40, gold: 20},
            abilities:      {}
        },
        {
            type:           NPCType.WARRIOR,
            name:           "Warrior",
            move_speed:     2,
            team:           Team.ORCS,
            tier:           NPCTier.STANDARD,
            health:         {base: 40, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0.10},
            resistance:     {physical: 0, magical: 0},
            bounty:         {xp: 7, gold: 3},
            abilities:      {}
        },
        {
            type:           NPCType.BRUTE,
            name:           "Brute",
            move_speed:     2,
            team:           Team.ORCS,
            tier:           NPCTier.ELITE,
            health:         {base: 75, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0.10, ranged: 0.10},
            resistance:     {physical: 0.33, magical: 0},
            bounty:         {xp: 15, gold: 8},
            abilities:      {}
        },
        {
            type:           NPCType.CHIEFTAIN,
            name:           "Chieftain",
            move_speed:     1,
            team:           Team.ORCS,
            tier:           NPCTier.BOSS,
            health:         {base: 165, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0.10},
            resistance:     {physical: 0.35, magical: 0},
            bounty:         {xp: 50, gold: 30},
            abilities:      {}
        },
        {
            type:           NPCType.REANIMATED_CORPSE,
            name:           "Reanimated Corpse",
            move_speed:     2,
            team:           Team.UNDEAD,
            tier:           NPCTier.STANDARD,
            health:         {base: 75, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0.33, magical: 0},
            bounty:         {xp: 10, gold: 5},
            abilities:      {}
        },
        {
            type:           NPCType.ANIMUS,
            name:           "Animus",
            move_speed:     2,
            team:           Team.UNDEAD,
            tier:           NPCTier.STANDARD,
            health:         {base: 65, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0, magical: 0.15},
            bounty:         {xp: 10, gold: 5},
            abilities:      {}
        },
        {
            type:           NPCType.GRAVE_KNIGHT,
            name:           "Grave Knight",
            move_speed:     2,
            team:           Team.UNDEAD,
            tier:           NPCTier.ELITE,
            health:         {base: 95, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0.25, magical: 0},
            bounty:         {xp: 17, gold: 10},
            abilities:      {}
        },
        {
            type:           NPCType.LICH,
            name:           "Lich",
            move_speed:     2,
            team:           Team.UNDEAD,
            tier:           NPCTier.ELITE,
            health:         {base: 65, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0, magical: 0.15},
            bounty:         {xp: 17, gold: 10},
            abilities:      {}
        },
        ,
        {
            type:           NPCType.DEATH_KNIGHT,
            name:           "Death Knight",
            move_speed:     1,
            team:           Team.UNDEAD,
            tier:           NPCTier.BOSS,
            health:         {base: 200, regen: 0.02},
            mana:           {base: 100, regen: 0.02},
            defense:        {melee: 0, ranged: 0},
            resistance:     {physical: 0, magical: 0.15},
            bounty:         {xp: 60, gold: 40},
            abilities:      {}
        }
    ];
}