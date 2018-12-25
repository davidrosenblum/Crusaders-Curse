import { EventEmitter } from "events";
import { GameClient } from "../server/GameClient";
import { CasterObject } from "../entities/CasterObject";
import { TransportNode, TransportNodeFullState, TransportNodeType } from "./TransportNode";
import { OpCode, Status, MapData } from "../data/Data";
import { GameObjectFullState } from "../entities/GameObject";

export interface GameMapFullState{
    transportNodes:TransportNodeFullState[];
    units:GameObjectFullState[];
    mapData:MapData;
}

export abstract class GameMap extends EventEmitter{
    private _mapData:MapData;
    private _clients:{[id:string]: GameClient};
    private _units:{[id:string]: CasterObject};
    private _transportNodes:{[id:string]: TransportNode};
    private _numClients:number;

    constructor(mapData:MapData){
        super();

        this._mapData = mapData;
        this._clients = {};
        this._units = {};
        this._transportNodes = {};
        this._numClients = 0;
    }

    private bulkUpdate(opCode:OpCode, data?:any, status?:Status):void{
        let json:string = JSON.stringify({opCode, data, status});

        this.forEachClient(client => client.sendString(json));
    }

    public submitChat(chat:string, from:string):void{
        this.bulkUpdate(OpCode.CHAT_MESSAGE, {chat, from}, Status.GOOD);
    }

    public addClient(client:GameClient, successBeforePlayer?:(done:Function)=>any):void{
        if(!this.hasClient(client)){
            this._clients[client.clientID] = client;
            this._numClients++;

            let mapState:GameMapFullState = this.getState();
            client.send(OpCode.ENTER_MAP, mapState, Status.GOOD);

            if(successBeforePlayer){
                successBeforePlayer(() => this.addUnit(client.player));
            }
            else{
                this.addUnit(client.player);
            }
        }
        else throw new Error("Already in map.")
    }

    public removeClient(client:GameClient):void{
        if(this.hasClient(client)){
            delete this._clients[client.clientID];
            this._numClients--;

            if(client.player){
                this.removeUnit(client.player);
            }

            if(this.isEmpty){
                this.emit("empty");
            }
        }
    }

    public addUnit(unit:CasterObject):boolean{
        if(!this.hasUnit(unit)){
            this._units[unit.objectID] = unit;

            this.forEachClient(client => client.send(OpCode.OBJECT_CREATE, unit.getState(), Status.GOOD));

            return true;
        }
        return false;
    }

    public removeUnit(unit:CasterObject):boolean{
        if(delete this._units[unit.objectID]){
            this.forEachClient(client => client.send(OpCode.OBJECT_DELETE, {objectID: unit.objectID}, Status.GOOD));

            return true;
        }
        return false;
    }

    public createTransportNode(type:TransportNodeType, text:string, row:number, col:number, outMapID, outX, outY):void{
        let tnode:TransportNode = new TransportNode(type, text, row, col, outMapID, outX, outY);

        this._transportNodes[tnode.nodeID] = tnode;
    }

    public hasClient(client:GameClient):boolean{
        return client.clientID in this._clients;
    }

    public hasUnit(unit:CasterObject):boolean{
        return unit.objectID in this._units;
    }
 
    private getState():GameMapFullState{
        let unitStates:GameObjectFullState[] = [];
        this.forEachUnit(unit => unitStates.push(unit.getState()));

        let tnodeStates:TransportNodeFullState[] = [];
        this.forEachTransportNode(tnode => tnodeStates.push(tnode.getState()));

        return {mapData: this._mapData, transportNodes: tnodeStates, units: unitStates};
    }

    private forEachClient(fn:(client:GameClient, clientID?:string)=>any):void{
        for(let clientID in this._clients){
            fn(this._clients[clientID], clientID);
        }
    }

    private forEachUnit(fn:(unit:CasterObject, objectID?:string)=>any):void{
        for(let unitID in this._units){
            fn(this._units[unitID], unitID);
        }
    }

    private forEachTransportNode(fn:(tnode:TransportNode, portalID?:string)=>any):void{
        for(let tnodeID in this._transportNodes){
            fn(this._transportNodes[tnodeID], tnodeID);
        }
    }

    public get numClients():number{
        return this._numClients;
    }

    public get isEmpty():boolean{
        return this.numClients === 0;
    }
}