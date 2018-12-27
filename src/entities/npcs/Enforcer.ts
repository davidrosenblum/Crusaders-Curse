import { NPCType, Team } from "../../data/Data";
import { NPC } from "../NPC";

export class Enforcer extends NPC{
    constructor(col:number=0, row:number=0, anim?:string, name?:string){
        super({
            type:           NPCType.ENFORCER,
            name:           name || "Enforcer",
            team:           Team.RAIDERS,
            moveSpeed:      1,
            health:         50,
            healthRegen:    0.02,
            mana:           100,
            manaRegen:      0.02,
            defense: {
                melee:      0.00,
                ranged:     0.00
            },
            resistance: {
                physical:   0.00,
                magical:    0.00
            },
            goldValue:      2,
            xpValue:        5,
            abilities: {

            },
            spawnCoords: {row, col},
            anim
        });
    }
}