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

    showGame(){
        this.emit("show-menu", {menu: "game"});
    }
}

export default new NavDispatcher();