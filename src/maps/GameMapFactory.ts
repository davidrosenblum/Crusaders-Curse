import { getMapData, getInstanceName, MapType, MapInstanceType, getMapName, NPCType } from "../data/Data";
import { TransportNodeType } from "./TransportNode";
import { GameMapInstance } from "./GameMapInstance";
import { GameMapOpen } from "./GameMapOpen";

export class GameMapFactory{
    public static createInstance(instanceType:MapInstanceType):GameMapInstance{
        switch(instanceType){
            case MapInstanceType.RAIDER_ENCAMPMENT:
                return new RaiderEncampment(); 
            default:
                throw new Error(`Invalid instance type (${instanceType} not recognized).`);
        }
    }

    public static createMap(mapType:MapType):GameMapOpen{
        switch(mapType){
            case MapType.CENTRAL_CITY:
                return new CentralCity();
            case MapType.HINTERLANDS:
                return new Hinterlands();
            case MapType.NORTHERN_RUINS:
                return new NorthernRuins();
            case MapType.DESERT_OASIS:
                return new DesertOasis();
            case MapType.VOLCANIC_WASTELANDS:
                return new VolcanicWastelands();
            default:
                throw new Error(`Invalid map type (${mapType} not recognized).`);
        }
    }

    public static createDefaultMaps():{[id:number]: GameMapOpen}{
        let maps:{[id:number]: GameMapOpen} = {};

        maps[MapType.CENTRAL_CITY] =        GameMapFactory.createMap(MapType.CENTRAL_CITY);
        maps[MapType.HINTERLANDS] =         GameMapFactory.createMap(MapType.HINTERLANDS);
        maps[MapType.NORTHERN_RUINS] =      GameMapFactory.createMap(MapType.NORTHERN_RUINS);
        maps[MapType.DESERT_OASIS] =        GameMapFactory.createMap(MapType.DESERT_OASIS);
        maps[MapType.VOLCANIC_WASTELANDS] = GameMapFactory.createMap(MapType.VOLCANIC_WASTELANDS);
        //maps[MapType.THE_SCHISM] =          GameMapFactory.createMap(MapType.THE_SCHISM);

        return maps;
    }
}

class CentralCity extends GameMapOpen{
    public static readonly NAME:string =    "Central City";
    public static readonly MAP_ID:number =  MapType.CENTRAL_CITY;
    
    constructor(){
        super("Central City", MapType.CENTRAL_CITY, getMapData(MapType.CENTRAL_CITY));

        this.createTransportNode(TransportNodeType.AIRSHIP, Hinterlands.NAME, 2, 2, Hinterlands.MAP_ID, 1, 5);
        this.createTransportNode(TransportNodeType.AIRSHIP, NorthernRuins.NAME, 2, 4, NorthernRuins.MAP_ID, 1, 5);
        this.createTransportNode(TransportNodeType.AIRSHIP, DesertOasis.NAME, 2, 6, DesertOasis.MAP_ID, 1, 5);
        this.createTransportNode(TransportNodeType.AIRSHIP, VolcanicWastelands.NAME, 2, 8, VolcanicWastelands.MAP_ID, 1, 5);

        this.createNPC(NPCType.PARAGON, 5, 3);
    }
}

class Hinterlands extends GameMapOpen{
    public static readonly NAME:string =    "Hinterlands";
    public static readonly MAP_ID:MapType =  MapType.HINTERLANDS;

    constructor(){
        super(Hinterlands.NAME, Hinterlands.MAP_ID, getMapData(Hinterlands.MAP_ID));

        this.createTransportNode(TransportNodeType.AIRSHIP, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 2);
    }
}

class NorthernRuins extends GameMapOpen{
    public static readonly NAME:string =    "Northern Ruins";
    public static readonly MAP_ID:MapType = MapType.NORTHERN_RUINS;

    constructor(){
        super(NorthernRuins.NAME, NorthernRuins.MAP_ID, getMapData(NorthernRuins.MAP_ID));

        this.createTransportNode(TransportNodeType.AIRSHIP, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 4);
    }
}

class DesertOasis extends GameMapOpen{
    public static readonly NAME:string =    "Desert Oasis";
    public static readonly MAP_ID:MapType = MapType.DESERT_OASIS;

    constructor(){
        super(DesertOasis.NAME, DesertOasis.MAP_ID, getMapData(DesertOasis.MAP_ID));

        this.createTransportNode(TransportNodeType.AIRSHIP, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 6);
    }
}

class VolcanicWastelands extends GameMapOpen{
    public static readonly NAME:string =    "Volcanic Wastelands";
    public static readonly MAP_ID:MapType = MapType.VOLCANIC_WASTELANDS;

    constructor(){
        super(VolcanicWastelands.NAME, VolcanicWastelands.MAP_ID, getMapData(VolcanicWastelands.MAP_ID));

        this.createTransportNode(TransportNodeType.AIRSHIP, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 8);
    }
}

class RaiderEncampment extends GameMapInstance{
    constructor(){
        super(getInstanceName(MapInstanceType.RAIDER_ENCAMPMENT), MapInstanceType.RAIDER_ENCAMPMENT, getMapData(MapInstanceType.RAIDER_ENCAMPMENT));

        this.createTransportNode(TransportNodeType.PORTAL, "Exit Encampment", 10, 3, Hinterlands.MAP_ID, 1, 1);
    }
}