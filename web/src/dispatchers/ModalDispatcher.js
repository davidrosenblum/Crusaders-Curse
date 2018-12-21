import { EventEmitter } from "events";

class ModalDispatcher extends EventEmitter{
    modal(body, header=null, footer=null){
        this.emit("modal", {header, body, footer});
    }
}

export default new ModalDispatcher();