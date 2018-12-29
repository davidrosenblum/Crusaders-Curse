import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";
import { AbilityItem } from "../../entities/CasterObject";

export class AbilitiesHandler{
    public getAbilities(client:GameClient):void{
        if(!client.player){
            client.send(OpCode.ABILITY_LIST, "Account is not logged in.", Status.BAD);
            return;
        }

        let abilities:{[ability:string]: AbilityItem} = client.player.getAbilities();

        client.send(OpCode.ABILITY_LIST, {abilities}, Status.GOOD);
    }
}