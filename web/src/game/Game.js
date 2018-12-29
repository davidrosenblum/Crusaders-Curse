import { EventEmitter } from "events";
import * as fw from "@davidrosenblum/frostwork";
import { getGameObjectType } from "./GameObjects";
import { GameObjectFactory } from "./GameObjectFactory";
import { TransportNodeFactory } from "./TransportNodeFactory";
import { MapTileTypes } from "./MapTileTypes";
import Client from "./Client";

export const TILE_SIZE = 64;

class Game extends EventEmitter{
    constructor(){
        super();

        this.renderer = new fw.Renderer(960, 540);
        this.keys = new fw.KeyboardWatcher();
        this.layers = new fw.MapLayers();
        this.units = new fw.MPEntityStorage();

        this.player = null;
        this.scroller = null;
        this.mapBounds = null;
        this.collisionGrid = null;

        this.todo = null;

        Client.on("object-create", evt => this.createUnit(evt.object));
        Client.on("object-delete", evt => this.deleteUnit(evt.objectID));
        Client.on("object-update", evt => this.updateUnit(evt.update));
    }

    async loadMap(mapState){
        this.todo = [];

        await fw.AssetUtils.loadAliases();

        let {transportNodes, units, mapData, name} = mapState;
        let {background, midground, foreground} = mapData;

        let layer1 = {
            tileLayout: background,
            tileTypes:  MapTileTypes
        };

        let layer2 = {
            tileLayout: midground,
            tileTypes:  MapTileTypes
        };

        let layer3 = {
            tileLayout: foreground,
            tileTypes:  MapTileTypes
        };

        let gmd = this.layers.buildMap({background: layer1, midground: layer2, foreground: layer3, tileSize: TILE_SIZE});
        console.log('gmd', gmd);

        this.mapBounds = gmd.mapBounds;
        this.collisionGrid = gmd.collisionGrid;
        this.scroller = new fw.Scroller(this.renderer, this.mapBounds);

        transportNodes.forEach(tnode => this.createTransportNode(tnode));
        units.forEach(unit => this.createUnit(unit));

        this.todo.forEach(task => task());
        this.todo = null;

        this.renderer.startRendering(this.layers.mapSprite);
        this.renderer.on("render", this.onFrame.bind(this));

        this.emit("map-load");
    } 

    unloadMap(){
        this.renderer.stopRendering();

        this.layers.removeAll();

        this.scroller = null;
        this.mapBounds = null;
        this.collisionGrid = null;
        this.player = null;
        this.units.clear();
    }

    onFrame(){
        this.updateMovement();
    }

    updateMovement(){
        if(this.player && this.keys.numKeys > 0){
            if(this.keys.isKeyDown('w')){
                this.player.moveUp(this.collisionGrid, this.mapBounds, this.scroller);
            }
            else if(this.keys.isKeyDown('s')){
                this.player.moveDown(this.collisionGrid, this.mapBounds, this.scroller);
            }
            if(this.keys.isKeyDown('a')){
                this.player.moveLeft(this.collisionGrid, this.mapBounds, this.scroller);
            }
            else if(this.keys.isKeyDown('d')){
                this.player.moveRight(this.collisionGrid, this.mapBounds, this.scroller);
            }

            this.layers.depthSort();
        }
    }

    updateUI(){

    }

    createTransportNode(data){
        let {col=0, row=0} = data;

        let tnode = TransportNodeFactory.create(data);
        if(tnode){
            this.layers.addAt(tnode, col, row);
        }
    }

    createUnit(data){
        let {type, spawnCoords, ownerID} = data;

        let object = GameObjectFactory.create(data);
        
        if(object){
            if(type === "player"){
                // check if client's player
                if(Client.clientID === ownerID){
                    this.player = object;
                }
            }
            
            let task = () => {
                if(this.units.addObject(object) || true){
                    if(spawnCoords){
                        this.layers.addAt(object, data.spawnCoords.col, data.spawnCoords.row);
                    }
                    else{
                        this.layers.add(object);
                    }
                }
            };
    
            if(this.todo){
                this.todo.push(task);
            }
            else{
                task();
            }
        }
    }

    deleteUnit(objectID){
        let task = () => {
            let object = this.units.getObject(objectID);
            if(object && this.units.removeObject(object)){
                object.remove();
            }
        };

        if(this.todo){
            this.todo.push(task);
        }
        else{
            task();
        }
    }

    updateUnit(data){
        let object = this.units.getObject(data.objectID);
        if(object){
            object.applyUpdate(data);
        }
    }
}

export default new Game();