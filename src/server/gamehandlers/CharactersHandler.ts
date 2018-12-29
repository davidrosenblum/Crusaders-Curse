import { EventEmitter } from "events";
import { GameClient } from "../GameClient";
import { OpCode, Status, Archetype } from "../../data/Data";
import { DBController } from "../../database/DBController";
import { CharacterDocument } from "../../database/collections/CharactersCollection";
import { PlayerFactory } from "../../entities/PlayerFactory";
import { MapsHandler } from "./MapsHandler";

export class CharactersHandler{
    private _database:DBController;
    private _maps:MapsHandler;

    constructor(database:DBController, mapsHandler:MapsHandler){
        this._database = database;
        this._maps = mapsHandler;
    }

    public getCharacters(client:GameClient):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_LIST, "Account is not logged in.", Status.BAD);
            return;
        }

        this._database.getCharacterList(client.accountID)
            .then(characterList => client.send(OpCode.CHARACTER_LIST, {characterList}, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_LIST, err.message, Status.BAD))
    }

    public createCharacter(client:GameClient, data:any):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_CREATE, "Account is not logged in.", Status.BAD);
            return;
        }

        let {name=null, archetype=null, skin=null} = data;

        if(!name || !archetype){
            client.send(OpCode.CHARACTER_CREATE, "Invalid request json - missing name and/or archetype.", Status.BAD);
            return;
        }

        let archetypeID:number = -1;
        switch(archetype.toLowerCase()){
            case "knight":
                archetypeID = Archetype.KNIGHT;
                break;
            case "ranger":
                archetypeID = Archetype.RANGER;
                break;
            case "mage":
                archetypeID = Archetype.MAGE;
                break;
        }

        if(archetypeID === -1){
            client.send(OpCode.CHARACTER_CREATE, "Invalid request json - invalid archetype.", Status.BAD);
            return;
        }

        this._database.createCharacter(client.accountID, archetypeID, name, skin)
            .then(message => client.send(OpCode.CHARACTER_CREATE, message, Status.GOOD))
            .catch(err => client.send(OpCode.CHARACTER_CREATE, err.message, Status.BAD));
    }

    public selectCharacter(client:GameClient, data:any):void{
        if(!client.hasAccountData){
            client.send(OpCode.CHARACTER_SELECT, "Account is not logged in.", Status.BAD);
            return;
        }

        if(client.player){
            client.send(OpCode.CHARACTER_SELECT, "Player already selected.", Status.BAD);
            return;
        }

        let {name} = data;
        client.setSelectedName(name);

        this._database.getCharacter(client.accountID, client.selectedName)
            .then(saveData => {
                let mapID:number = saveData.last_map.map_id;
                this._maps.enterMap(client, {mapID});
            })
            .catch(err => {
                client.setSelectedName(null);
                client.send(OpCode.CHARACTER_SELECT, err.message, Status.BAD);
            });
    }
} 