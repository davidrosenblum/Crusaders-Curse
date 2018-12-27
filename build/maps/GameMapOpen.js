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
var GameMapOpen = /** @class */ (function (_super) {
    __extends(GameMapOpen, _super);
    function GameMapOpen(name, mapType, mapData) {
        var _this = _super.call(this, name, mapData) || this;
        _this._mapType = mapType;
        return _this;
    }
    Object.defineProperty(GameMapOpen.prototype, "mapType", {
        get: function () {
            return this._mapType;
        },
        enumerable: true,
        configurable: true
    });
    return GameMapOpen;
}(GameMap_1.GameMap));
exports.GameMapOpen = GameMapOpen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcE9wZW4uanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJtYXBzL0dhbWVNYXBPcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUdwQztJQUFpQywrQkFBTztJQUlwQyxxQkFBWSxJQUFXLEVBQUUsT0FBZSxFQUFFLE9BQWU7UUFBekQsWUFDSSxrQkFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBR3ZCO1FBREcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O0lBQzVCLENBQUM7SUFFRCxzQkFBVyxnQ0FBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWJELENBQWlDLGlCQUFPLEdBYXZDO0FBYlksa0NBQVcifQ==