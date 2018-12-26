import { EventEmitter } from "events";
import NavDispatcher from "../dispatchers/NavDispatcher";
import { OpCode, MSG_DELIM, Status } from "./Data";

export const VERSION = "0.1.0";

class Client extends EventEmitter{
    constructor(){
        super();

        this.socket = null;
        this.clientID = null;
    }

    connect(){
        if(!this.socket){
            this.socket = new WebSocket(`ws://${window.location.host.replace("3000", "8080")}`);
            
            this.socket.addEventListener("open", this.onSocketOpen.bind(this));
            this.socket.addEventListener("close", this.onSocketClose.bind(this));
            this.socket.addEventListener("message", this.onSocketMessage.bind(this));
        }
    }

    close(){
        if(this.socket){
            this.socket.close();
        }
    }

    onSocketOpen(){
        this.emit("connect");
    }

    onSocketClose(){
        this.emit("close");
    }

    onSocketMessage(evt){
        evt.data.split(MSG_DELIM).forEach(msg => {
            let opCode, data, status;

            try{
                let json = JSON.parse(msg);
                console.log(json);

                opCode = json.opCode || -1;
                data = json.data || null;
                status = json.status || null;
            }   
            catch(err){
                return;
            }

            this.processResponse(opCode, data, status);
        });
    }

    processResponse(opCode, data, status){
        switch(opCode){
            case OpCode.ACCOUNT_LOGIN: 
                return this.handleLogin(data, status);
            case OpCode.ACCOUNT_LOGOUT: 
                return this.handleLogout(data, status);
            case OpCode.CHARACTER_LIST: 
                return this.handeCharacterList(data, status);
        }
    }

    handleLogin(data, status){
        if(status === Status.GOOD){
            this.clientID = data.clientID;
            this.emit("login", {success: true});
        }
        else this.emit("login", {message: data.message, success: false});
    }

    handleLogout(data, status){
        if(status === Status.GOOD){
            this.emit("logout", {success: true});
        }
    }

    handeCharacterList(data, status){
        if(status === Status.GOOD){
            this.emit("character-list", {characterList: data, success: true});
        }
        else this.emit("character-list", {message: data.message, success: false});
    }

    send(opCode, data){
        if(!this.socket){
            this.emit("error", {message: "Not connected to server."});
            return;
        }

        try{
            let json = JSON.stringify({opCode, data});

            this.socket.send(json + MSG_DELIM);
        }
        catch(err){
            return;
        }
    }

    login(username, password){
        this.send(OpCode.ACCOUNT_LOGIN, {username, password, version: VERSION});
    }

    logout(){
        this.send(OpCode.ACCOUNT_LOGOUT);
    }

    getCharacterList(){
        this.send(OpCode.CHARACTER_LIST);
    }

    createCharacter(name, archetype, skin){
        this.send(OpCode.CHARACTER_CREATE, {name, archetype, skin});
    }

    selectCharacter(name){
        this.send(OpCode.CHARACTER_SELECT, {name});
    }

    get isConnected(){
        return this.socket ? this.socket.readyState === 1 : false;
    }
}

export default new Client();