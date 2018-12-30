import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";
import { AbilityItem, CasterObject } from "../../entities/CasterObject";

export class AbilitiesHandler{
    public getAbilities(client:GameClient):void{
        if(!client.player){
            client.send(OpCode.ABILITY_LIST, "No current player.", Status.BAD);
            return;
        }

        let abilities:{[ability:string]: AbilityItem} = client.player.getAbilities();

        client.send(OpCode.ABILITY_LIST, {abilities}, Status.GOOD);
    }

    public castAbility(client:GameClient, data:any):void{
        if(!client.player || !client.player.map){
            client.send(OpCode.ABILITY_CAST, "No current player in a map.", Status.BAD);
            return;
        }

        let {objectID=null, abilityName=null} = data;
        if(!objectID || !abilityName){
            client.send(OpCode.ABILITY_CAST, "Invalid request json - missing target's objectID or abilityName.", Status.BAD);
            return;
        }

        try{
            client.player.map.unitCastAbility(client.player.objectID, abilityName, objectID);
        }
        catch(err){
            client.send(OpCode.ABILITY_CAST, err.message, Status.BAD);
            return;
        }

        client.send(OpCode.ABILITY_CAST, "Ability casted.", Status.GOOD);
    }

    public purchaseAbility(client:GameClient, data:any):void{
        
    }
}