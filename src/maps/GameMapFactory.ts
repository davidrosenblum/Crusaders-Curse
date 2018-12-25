import { getMapData, getInstanceName, MapType, MapInstanceType } from "../data/Data";
import { TransportNodeType } from "./TransportNode";
import { GameMapInstance } from "./GameMapInstance";

export class GameMapFactory{
    public static createInstance(instanceType:MapInstanceType):GameMapInstance{
        switch(instanceType){
            case MapInstanceType.RAIDER_ENCAMPMENT:
                return new RaiderEncampment(); 
            default:
                throw new Error(`Invalid instance type (${instanceType} not recognized).`);
        }
    }

    public static createMap():void{

    }
}

class RaiderEncampment extends GameMapInstance{
    constructor(){
        super(getInstanceName(MapInstanceType.RAIDER_ENCAMPMENT), MapInstanceType.RAIDER_ENCAMPMENT, getMapData(MapInstanceType.RAIDER_ENCAMPMENT));

        this.createTransportNode(TransportNodeType.PORTAL, "Exit Encampment", 10, 3, MapType.HINTERLANDS, 0, 0);
    }
}