import { GameMap } from "./GameMap";
import { TokenGenerator } from "../utils/TokenGenerator";
import { MapInstanceType, MapData } from "../data/Data";

export class GameMapInstance extends GameMap{
    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _instanceID:string;
    private _instanceName:string;
    private _instanceType:MapInstanceType;

    constructor(instanceName:string, instanceType:MapInstanceType, mapData:MapData){
        super(mapData);

        this._instanceID = GameMapInstance.tokenGen.nextToken();
        this._instanceName = instanceName;
        this._instanceType = instanceType;
    }

    public get instanceID():string{
        return this._instanceID;
    }

    public get instanceName():string{
        return this._instanceName;
    }

    public get instanceType():MapInstanceType{
        return this._instanceType;
    }
}