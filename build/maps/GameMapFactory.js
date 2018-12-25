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
    GameMapFactory.createMap = function () {
    };
    return GameMapFactory;
}());
exports.GameMapFactory = GameMapFactory;
var RaiderEncampment = /** @class */ (function (_super) {
    __extends(RaiderEncampment, _super);
    function RaiderEncampment() {
        var _this = _super.call(this, Data_1.getInstanceName(1 /* RAIDER_ENCAMPMENT */), 1 /* RAIDER_ENCAMPMENT */, Data_1.getMapData(1 /* RAIDER_ENCAMPMENT */)) || this;
        _this.createTransportNode("portal" /* PORTAL */, "Exit Encampment", 10, 3, 2 /* HINTERLANDS */, 0, 0);
        return _this;
    }
    return RaiderEncampment;
}(GameMapInstance_1.GameMapInstance));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcEZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJtYXBzL0dhbWVNYXBGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFxRjtBQUVyRixxREFBb0Q7QUFFcEQ7SUFBQTtJQWFBLENBQUM7SUFaaUIsNkJBQWMsR0FBNUIsVUFBNkIsWUFBNEI7UUFDckQsUUFBTyxZQUFZLEVBQUM7WUFDaEI7Z0JBQ0ksT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDbEM7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBMEIsWUFBWSxzQkFBbUIsQ0FBQyxDQUFDO1NBQ2xGO0lBQ0wsQ0FBQztJQUVhLHdCQUFTLEdBQXZCO0lBRUEsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSx3Q0FBYztBQWUzQjtJQUErQixvQ0FBZTtJQUMxQztRQUFBLFlBQ0ksa0JBQU0sc0JBQWUsMkJBQW1DLDZCQUFxQyxpQkFBVSwyQkFBbUMsQ0FBQyxTQUc5STtRQURHLEtBQUksQ0FBQyxtQkFBbUIsd0JBQTJCLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0lBQzVHLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFORCxDQUErQixpQ0FBZSxHQU03QyJ9