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
var GameMap_1 = require("./GameMap");
var TokenGenerator_1 = require("../utils/TokenGenerator");
var GameMapInstance = /** @class */ (function (_super) {
    __extends(GameMapInstance, _super);
    function GameMapInstance(name, instanceType, mapData) {
        var _this = _super.call(this, name, mapData) || this;
        _this._instanceID = GameMapInstance.tokenGen.nextToken();
        _this._instanceType = instanceType;
        return _this;
    }
    Object.defineProperty(GameMapInstance.prototype, "instanceID", {
        get: function () {
            return this._instanceID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMapInstance.prototype, "instanceType", {
        get: function () {
            return this._instanceType;
        },
        enumerable: true,
        configurable: true
    });
    GameMapInstance.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return GameMapInstance;
}(GameMap_1.GameMap));
exports.GameMapInstance = GameMapInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcEluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsibWFwcy9HYW1lTWFwSW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBQ3BDLDBEQUF5RDtBQUd6RDtJQUFxQyxtQ0FBTztJQU14Qyx5QkFBWSxJQUFXLEVBQUUsWUFBNEIsRUFBRSxPQUFlO1FBQXRFLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUl2QjtRQUZHLEtBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RCxLQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQzs7SUFDdEMsQ0FBQztJQUVELHNCQUFXLHVDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFsQmMsd0JBQVEsR0FBa0IsSUFBSSwrQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBbUJwRSxzQkFBQztDQUFBLEFBcEJELENBQXFDLGlCQUFPLEdBb0IzQztBQXBCWSwwQ0FBZSJ9