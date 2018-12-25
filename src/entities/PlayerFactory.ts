import { Archetype, getArchetypeName, Facing } from "../data/Data";
import { CharacterDocument } from "../database/collections/CharactersCollection";
import { Player } from "./Player";

export class PlayerFactory{
    public static restoreFromSave(saveData:CharacterDocument):Player{
        switch(saveData.archetype_id){
            case Archetype.KNIGHT:
                return PlayerFactory.createKnight(saveData);
            case Archetype.RANGER:
                return PlayerFactory.createRanger(saveData);
            case Archetype.MAGE:
                return PlayerFactory.createMage(saveData);
            default:
                return null;
        }
    }

    private static createKnight(saveData:CharacterDocument):Player{
        return new Player(saveData, {
            name:               saveData.name,
            type:               "player",
            archetype:          getArchetypeName(Archetype.KNIGHT),
            health:             125,
            healthRegen:        0.03,
            mana:               100,
            manaRegen:          0.02,
            moveSpeed:          1,
            resistance: {
                physical:       0.25,
                magical:        0.15
            },
            defense: {
                melee:          0.15,
                ranged:         0.10
            },
            abilities:          {},
            damageMultiplier:   1,
            x:                  saveData.last_map.x,
            y:                  saveData.last_map.y
        });
    }

    private static createRanger(saveData:CharacterDocument):Player{
        return new Player(saveData, {
            name:               saveData.name,
            type:               "player",
            archetype:          getArchetypeName(Archetype.RANGER),
            health:             100,
            healthRegen:        0.02,
            mana:               100,
            manaRegen:          0.02,
            moveSpeed:          1,
            resistance: {
                physical:       0.10,
                magical:        0.05
            },
            defense: {
                melee:          0.25,
                ranged:         0.15
            },
            abilities:          {},
            damageMultiplier:   1,
            x:                  saveData.last_map.x,
            y:                  saveData.last_map.y
        });
    }

    private static createMage(saveData:CharacterDocument):Player{
        return new Player(saveData, {
            name:               saveData.name,
            type:               "player",
            archetype:          getArchetypeName(Archetype.MAGE),
            health:             85,
            healthRegen:        0.02,
            mana:               100,
            manaRegen:          0.04,
            moveSpeed:          1,
            resistance: {
                physical:       0.00,
                magical:        0.20
            },
            defense: {
                melee:          0.15,
                ranged:         0.20
            },
            abilities:          {},
            damageMultiplier:   1,
            x:                  saveData.last_map.x,
            y:                  saveData.last_map.y
        });
    }
}