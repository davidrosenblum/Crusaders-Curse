import { GameClient } from "../GameClient";
import { OpCode, Status } from "../../data/Data";
import { GameMapOpen } from "../../maps/GameMapOpen";
import { GameMapFactory } from "../../maps/GameMapFactory";
import { GameMapInstance } from "../../maps/GameMapInstance";
import { CharacterDocument } from "../../database/collections/CharactersCollection";
import { PlayerFactory } from "../../entities/PlayerFactory";
import { DBController } from "../../database/DBController";
import { GameMap } from "../../maps/GameMap";
import { CombatStats } from "../../entities/CombatObject";
import { GameObjectState } from "../../entities/GameObject";

export class MapsHandler{
    private _database:DBController;
    private _maps:{[id:number]: GameMapOpen};
    private _instances:{[id:number]: GameMapInstance};
    private _numInstances:number;

    constructor(database:DBController){
        this._database = database;
        this._maps = GameMapFactory.createDefaultMaps();
        this._instances = {};
        this._numInstances = 0;
    }

    private loadPlayer(client:GameClient):Promise<CharacterDocument>{
        return new Promise((resolve, reject) => {
            this._database.getCharacter(client.accountID, client.selectedName)
                .then(saveData => {
                    client.player = PlayerFactory.restoreFromSave(saveData, client.clientID);
                    resolve(saveData);
                })
                .catch(err => reject(err));
        });
    }

    public enterMap(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.selectedName){
            client.send(OpCode.ENTER_MAP, "Account is not logged in.", Status.BAD);
            return;
        }

        let {mapID=null} = data;

        if(!mapID){
            client.send(OpCode.ENTER_MAP, "Invalid request json - missing map ID.")
            return;
        }

        let map:GameMapOpen = this._maps[mapID] || null;
        if(!map){
            client.send(OpCode.ENTER_MAP, "Invalid map ID.");
            return;
        }

        // if player has been loaded (not first map join after log in) & player is switching maps 
        if(client.player && client.player.map){
            client.player.map.removeClient(client);
        }

        try{
            // sends the map join packet
            map.addClient(client, done => {
                // reload the player
                this.loadPlayer(client)
                    .then(() => done())
                    .catch(err => client.send(OpCode.ENTER_INSTANCE, err.message, Status.BAD));
            });
        }
        catch(err){
            client.send(OpCode.ENTER_MAP, err.message, Status.BAD);
        }
    }

    public enterInstance(client:GameClient, data:any):void{
        if(!client.hasAccountData || !client.selectedName){
            client.send(OpCode.ENTER_INSTANCE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {instanceID=null, instanceType=null} = data;

        if(!instanceID && !instanceType){
            client.send(OpCode.ENTER_INSTANCE, "Invalid request json - missing instance ID or new instance type.");
            return;
        }

        let instance:GameMapInstance = null;

        if(instanceID){
            instance = this._instances[instanceID] || null;
        }
        else if(instanceType){
            try{
                instance = GameMapFactory.createInstance(instanceType);

                instance.on("empty", () => {
                    delete this._instances[instance.instanceID];
                    this._numInstances--;
                });
            }
            catch(err){
                client.send(OpCode.ENTER_INSTANCE, `Unable to create instance: ${err.message}`, Status.BAD);
                return;
            }
        }

        if(!instance){
            client.send(OpCode.ENTER_INSTANCE, "Instance not found.", Status.BAD);
            return;
        }

        try{
            // sends the map join packet
            instance.addClient(client, done => {
                // reload the player
                this.loadPlayer(client)
                    .then(() => done())
                    .catch(err => client.send(OpCode.ENTER_INSTANCE, err.message, Status.BAD));
            }); 
        }
        catch(err){
            client.send(OpCode.ENTER_INSTANCE, err.message, Status.BAD);
        }
    }

    public updateUnit(client:GameClient, data:any):void{
        if(!client.player || !client.player.map){
            client.send(OpCode.OBJECT_STATS, "Not in a room with a player.", Status.BAD);
            return;
        }

        let {objectID=-1, x=undefined, y=undefined, anim=undefined} = data;

        let update:GameObjectState = {objectID, x, y, anim};

        client.player.map.updateUnit(update);   // sends the update 
    }

    public getUnitStats(client:GameClient, data:any):void{
        if(!client.player || !client.player.map){
            client.send(OpCode.OBJECT_STATS, "Not in a room with a player.", Status.BAD);
            return;
        }

        let {objectID=null} = data; 
        if(!objectID){
            client.send(OpCode.OBJECT_STATS, "Invalid json request - missing objectID.", Status.BAD);
            return;
        }

        let map:GameMap = client.player.map;
        if(map){
            let stats:CombatStats = client.player.map.getUnitStats(objectID);

            if(stats){
                client.send(OpCode.OBJECT_STATS, stats, Status.GOOD);
            }
            else{
                client.send(OpCode.OBJECT_STATS, "Invalid target ID.", Status.BAD);
            }
        }
        else{
            client.send(OpCode.OBJECT_STATS, "You are not in a map.", Status.BAD);
        }
    }

    public get numInstances():number{
        return this._numInstances;
    }
}