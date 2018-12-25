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
    function GameMapInstance(instanceName, instanceType, mapData) {
        var _this = _super.call(this, mapData) || this;
        _this._instanceID = GameMapInstance.tokenGen.nextToken();
        _this._instanceName = instanceName;
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
    Object.defineProperty(GameMapInstance.prototype, "instanceName", {
        get: function () {
            return this._instanceName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcEluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsibWFwcy9HYW1lTWFwSW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBQ3BDLDBEQUF5RDtBQUd6RDtJQUFxQyxtQ0FBTztJQU94Qyx5QkFBWSxZQUFtQixFQUFFLFlBQTRCLEVBQUUsT0FBZTtRQUE5RSxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUtqQjtRQUhHLEtBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RCxLQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxLQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQzs7SUFDdEMsQ0FBQztJQUVELHNCQUFXLHVDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx5Q0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQXhCYyx3QkFBUSxHQUFrQixJQUFJLCtCQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUF5QnBFLHNCQUFDO0NBQUEsQUExQkQsQ0FBcUMsaUJBQU8sR0EwQjNDO0FBMUJZLDBDQUFlIn0=