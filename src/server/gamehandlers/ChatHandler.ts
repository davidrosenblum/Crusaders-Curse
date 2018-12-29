import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";

export class ChatHandler{    
    public chatMessage(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.selectedName){
            client.send(OpCode.CHAT_MESSAGE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {chat=null} = data;

        if(typeof chat === "string"){
            if(chat.charAt(0) === "~" && client.accessLevel > 1){
                this.adminCommand(client, chat);
            }
            else{
                client.player.map.submitChat(chat, client.selectedName);
            }
        }  
    } 

    private adminCommand(client:GameClient, chat:string):void{

    }
}