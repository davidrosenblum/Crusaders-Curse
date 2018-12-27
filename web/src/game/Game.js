import { EventEmitter } from "events";
import * as fw from "@davidrosenblum/frostwork";
import { getGameObjectType } from "./GameObjects";
import { GameObjectFactory } from "./GameObjectFactory";

class Game extends EventEmitter{
    constructor(){
        super();

        this.renderer = new fw.Renderer();
        this.keys = new fw.KeyboardWatcher();
        this.layers = new fw.MapLayers();
        this.units = new fw.MPEntityStorage();

        this.scroller = null;
        this.mapBounds = null;
        this.collisionGrid = null;

        this.todo = null;
    }

    loadMap(mapState){
        this.todo = [];

        let {transportNodes, units, mapData} = mapState;
        let {tileSize, background, midground, foreground} = mapData;

        let gmd = this.layers.buildMap({background, midground, foreground, tileSize});

        this.mapBounds = gmd.mapBounds;
        this.collisionGrid = gmd.collisionGrid;
        this.scroller = new fw.Scroller(this.renderer, this.mapBounds);

        transportNodes.forEach(tnode => null);
        units.forEach(unit => this.createUnit(unit));

        this.todo.forEach(task => task());
        this.todo = null;
    } 

    unloadMap(){
        this.layers.removeAll();

        this.scroller = null;
        this.mapBounds = null;
        this.collisionGrid = null;
    }

    updateUI(){

    }

    createTransportNode(data){
        let Type = getGameObjectType()
    }

    createUnit(data){
        let object = GameObjectFactory.create(data.type, data.x, data.y, data.anim, data.name);
        if(object){
            if(data.type === "player"){
                // check if client's player
            }
    
            let task = () => {
                if(this.units.addObject(object)){
                    this.layers.add(object);
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