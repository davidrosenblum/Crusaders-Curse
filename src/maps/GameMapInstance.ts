import { GameMap } from "./GameMap";
import { TokenGenerator } from "../utils/TokenGenerator";
import { MapInstanceType, MapData } from "../data/Data";

export class GameMapInstance extends GameMap{
    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _instanceID:string;
    private _instanceType:MapInstanceType;

    constructor(name:string, instanceType:MapInstanceType, mapData:MapData){
        super(name, mapData);

        this._instanceID = GameMapInstance.tokenGen.nextToken();
        this._instanceType = instanceType;
    }

    public get instanceID():string{
        return this._instanceID;
    }

    public get instanceType():MapInstanceType{
        return this._instanceType;
    }
}