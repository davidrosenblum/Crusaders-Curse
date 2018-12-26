import { EventEmitter } from "events";

class NavDispatcher extends EventEmitter{
    showLanding(){
        this.emit("show-menu", {menu: "landing"});
    }

    showRegister(){
        this.emit("show-menu", {menu: "register"});
    }

    showLogin(){
        this.emit("show-menu", {menu: "login"});
    }

    showCharacterSelect(){
        this.emit("show-menu", {menu: "character-select"});
    }
    
    showCharacterCreate(){
        this.emit("show-menu", {menu: "character-create"});
    }

    showGame(){
        this.emit("show-menu", {menu: "game"});
    }
}

export default new NavDispatcher();