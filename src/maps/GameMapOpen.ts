import { GameMap } from "./GameMap";
import { MapType, MapData } from "../data/Data";

export class GameMapOpen extends GameMap{
    private _mapName:string;
    private _mapType:MapType;

    constructor(name:string, mapType:MapType, mapData:MapData){
        super(name, mapData);
        
        this._mapType = mapType;
    }

    public get mapType():MapType{
        return this._mapType;
    }
}