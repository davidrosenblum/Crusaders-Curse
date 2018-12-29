"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../data/Data");
var GameMapInstance_1 = require("./GameMapInstance");
var GameMapOpen_1 = require("./GameMapOpen");
var GameMapFactory = /** @class */ (function () {
    function GameMapFactory() {
    }
    GameMapFactory.createInstance = function (instanceType) {
        switch (instanceType) {
            case 1 /* RAIDER_ENCAMPMENT */:
                return new RaiderEncampment();
            default:
                throw new Error("Invalid instance type (" + instanceType + " not recognized).");
        }
    };
    GameMapFactory.createMap = function (mapType) {
        switch (mapType) {
            case 1 /* CENTRAL_CITY */:
                return new CentralCity();
            case 2 /* HINTERLANDS */:
                return new Hinterlands();
            case 3 /* NORTHERN_RUINS */:
                return new NorthernRuins();
            case 4 /* DESERT_OASIS */:
                return new DesertOasis();
            case 5 /* VOLCANIC_WASTELANDS */:
                return new VolcanicWastelands();
            default:
                throw new Error("Invalid map type (" + mapType + " not recognized).");
        }
    };
    GameMapFactory.createDefaultMaps = function () {
        var maps = {};
        maps[1 /* CENTRAL_CITY */] = GameMapFactory.createMap(1 /* CENTRAL_CITY */);
        maps[2 /* HINTERLANDS */] = GameMapFactory.createMap(2 /* HINTERLANDS */);
        maps[3 /* NORTHERN_RUINS */] = GameMapFactory.createMap(3 /* NORTHERN_RUINS */);
        maps[4 /* DESERT_OASIS */] = GameMapFactory.createMap(4 /* DESERT_OASIS */);
        maps[5 /* VOLCANIC_WASTELANDS */] = GameMapFactory.createMap(5 /* VOLCANIC_WASTELANDS */);
        //maps[MapType.THE_SCHISM] =          GameMapFactory.createMap(MapType.THE_SCHISM);
        return maps;
    };
    return GameMapFactory;
}());
exports.GameMapFactory = GameMapFactory;
var CentralCity = /** @class */ (function (_super) {
    __extends(CentralCity, _super);
    function CentralCity() {
        var _this = _super.call(this, "Central City", 1 /* CENTRAL_CITY */, Data_1.getMapData(CentralCity.NAME)) || this;
        _this.createTransportNode("airship" /* AIRSHIP */, "<" + Hinterlands.NAME + " Airship>", 2, 2, Hinterlands.MAP_ID, 1, 5);
        _this.createTransportNode("airship" /* AIRSHIP */, "<" + NorthernRuins.NAME + " Airship>", 2, 4, NorthernRuins.MAP_ID, 1, 5);
        _this.createTransportNode("airship" /* AIRSHIP */, "<" + DesertOasis.NAME + " Airship>", 2, 6, DesertOasis.MAP_ID, 1, 5);
        _this.createTransportNode("airship" /* AIRSHIP */, "<" + VolcanicWastelands.NAME + " Airship>", 2, 8, VolcanicWastelands.MAP_ID, 1, 5);
        _this.createNPC("paragon" /* PARAGON */, 5, 3);
        return _this;
    }
    CentralCity.NAME = "Central City";
    CentralCity.MAP_ID = 1 /* CENTRAL_CITY */;
    return CentralCity;
}(GameMapOpen_1.GameMapOpen));
var Hinterlands = /** @class */ (function (_super) {
    __extends(Hinterlands, _super);
    function Hinterlands() {
        var _this = _super.call(this, Hinterlands.NAME, Hinterlands.MAP_ID, Data_1.getMapData(Hinterlands.NAME)) || this;
        _this.createTransportNode("airship" /* AIRSHIP */, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 2);
        return _this;
    }
    Hinterlands.NAME = "Hinterlands";
    Hinterlands.MAP_ID = 2 /* HINTERLANDS */;
    return Hinterlands;
}(GameMapOpen_1.GameMapOpen));
var NorthernRuins = /** @class */ (function (_super) {
    __extends(NorthernRuins, _super);
    function NorthernRuins() {
        var _this = _super.call(this, NorthernRuins.NAME, NorthernRuins.MAP_ID, Data_1.getMapData(NorthernRuins.NAME)) || this;
        _this.createTransportNode("airship" /* AIRSHIP */, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 4);
        return _this;
    }
    NorthernRuins.NAME = "Northern Ruins";
    NorthernRuins.MAP_ID = 3 /* NORTHERN_RUINS */;
    return NorthernRuins;
}(GameMapOpen_1.GameMapOpen));
var DesertOasis = /** @class */ (function (_super) {
    __extends(DesertOasis, _super);
    function DesertOasis() {
        var _this = _super.call(this, DesertOasis.NAME, DesertOasis.MAP_ID, Data_1.getMapData(DesertOasis.NAME)) || this;
        _this.createTransportNode("airship" /* AIRSHIP */, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 6);
        return _this;
    }
    DesertOasis.NAME = "Desert Oasis";
    DesertOasis.MAP_ID = 4 /* DESERT_OASIS */;
    return DesertOasis;
}(GameMapOpen_1.GameMapOpen));
var VolcanicWastelands = /** @class */ (function (_super) {
    __extends(VolcanicWastelands, _super);
    function VolcanicWastelands() {
        var _this = _super.call(this, VolcanicWastelands.NAME, VolcanicWastelands.MAP_ID, Data_1.getMapData(VolcanicWastelands.NAME)) || this;
        _this.createTransportNode("airship" /* AIRSHIP */, CentralCity.NAME, 1, 5, CentralCity.MAP_ID, 2, 8);
        return _this;
    }
    VolcanicWastelands.NAME = "Volcanic Wastelands";
    VolcanicWastelands.MAP_ID = 5 /* VOLCANIC_WASTELANDS */;
    return VolcanicWastelands;
}(GameMapOpen_1.GameMapOpen));
var RaiderEncampment = /** @class */ (function (_super) {
    __extends(RaiderEncampment, _super);
    function RaiderEncampment() {
        var _this = _super.call(this, Data_1.getInstanceName(1 /* RAIDER_ENCAMPMENT */), 1 /* RAIDER_ENCAMPMENT */, Data_1.getMapData(RaiderEncampment.NAME)) || this;
        _this.createTransportNode("portal" /* PORTAL */, "Exit Encampment", 10, 3, Hinterlands.MAP_ID, 1, 1);
        return _this;
    }
    RaiderEncampment.NAME = "Raider Encampment";
    return RaiderEncampment;
}(GameMapInstance_1.GameMapInstance));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcEZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJtYXBzL0dhbWVNYXBGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUEwRztBQUUxRyxxREFBb0Q7QUFDcEQsNkNBQTRDO0FBRTVDO0lBQUE7SUF1Q0EsQ0FBQztJQXRDaUIsNkJBQWMsR0FBNUIsVUFBNkIsWUFBNEI7UUFDckQsUUFBTyxZQUFZLEVBQUM7WUFDaEI7Z0JBQ0ksT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDbEM7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBMEIsWUFBWSxzQkFBbUIsQ0FBQyxDQUFDO1NBQ2xGO0lBQ0wsQ0FBQztJQUVhLHdCQUFTLEdBQXZCLFVBQXdCLE9BQWU7UUFDbkMsUUFBTyxPQUFPLEVBQUM7WUFDWDtnQkFDSSxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0I7Z0JBQ0ksT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzdCO2dCQUNJLE9BQU8sSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUMvQjtnQkFDSSxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0I7Z0JBQ0ksT0FBTyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDcEM7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBcUIsT0FBTyxzQkFBbUIsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVhLGdDQUFpQixHQUEvQjtRQUNJLElBQUksSUFBSSxHQUE4QixFQUFFLENBQUM7UUFFekMsSUFBSSxzQkFBc0IsR0FBVSxjQUFjLENBQUMsU0FBUyxzQkFBc0IsQ0FBQztRQUNuRixJQUFJLHFCQUFxQixHQUFXLGNBQWMsQ0FBQyxTQUFTLHFCQUFxQixDQUFDO1FBQ2xGLElBQUksd0JBQXdCLEdBQVEsY0FBYyxDQUFDLFNBQVMsd0JBQXdCLENBQUM7UUFDckYsSUFBSSxzQkFBc0Is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