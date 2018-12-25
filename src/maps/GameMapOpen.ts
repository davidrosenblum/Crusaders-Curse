import { GameMap } from "./GameMap";
import { MapType, MapData } from "../data/Data";

export class GameMapOpen extends GameMap{
    private _mapName:string;
    private _mapType:MapType;

    constructor(mapName:string, mapType:MapType, mapData:MapData){
        super(mapData);

        this._mapName = mapName;
        this._mapType = mapType;
    }

    public get mapName():string{
        return this._mapName;
    }

    public get mapType():MapType{
        return this._mapType;
    }
}