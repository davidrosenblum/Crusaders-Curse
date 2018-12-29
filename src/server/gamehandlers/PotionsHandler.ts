import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";
import { Potions } from "../../entities/Player";

export class PotionsHandler{
    public getPotions(client:GameClient):void{
        if(!client.player){
            client.send(OpCode.POTION_LIST, "Account is not logged in.", Status.BAD);
            return;
        }

        let potions:Potions = client.player.getPotions();

        client.send(OpCode.POTION_LIST, {potions}, Status.GOOD);
    }
}   