import { NPCType, Team } from "../../data/Data";
import { NPC } from "../NPC";

export class Paragon extends NPC{
    constructor(x?:number, y?:number, anim?:string, name?:string){
        super({
            type:           NPCType.PARAGON,
            name:           name || "Paragon",
            team:           Team.KINGS_LEGION,
            moveSpeed:      1,
            health:         Paragon.HEALTH_CAP,
            healthRegen:    Paragon.HEALTH_REGEN_CAP,
            mana:           Paragon.MANA_CAP,
            manaRegen:      Paragon.MANA_REGEN_CAP,
            defense: {
                melee:      Paragon.DEFENSE_CAP,
                ranged:     Paragon.DEFENSE_CAP
            },
            resistance: {
                physical:   Paragon.RESISTANCE_CAP,
                magical:    Paragon.RESISTANCE_CAP
            },
            goldValue:      0,
            xpValue:        0,
            abilities: {

            },
            x,
            y,
            anim
        });
    }
}