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
    function GameMapOpen(mapName, mapType, mapData) {
        var _this = _super.call(this, mapData) || this;
        _this._mapName = mapName;
        _this._mapType = mapType;
        return _this;
    }
    Object.defineProperty(GameMapOpen.prototype, "mapName", {
        get: function () {
            return this._mapName;
        },
        enumerable: true,
        configurable: true
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcE9wZW4uanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJtYXBzL0dhbWVNYXBPcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUdwQztJQUFpQywrQkFBTztJQUlwQyxxQkFBWSxPQUFjLEVBQUUsT0FBZSxFQUFFLE9BQWU7UUFBNUQsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFGRyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7SUFDNUIsQ0FBQztJQUVELHNCQUFXLGdDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFDTCxrQkFBQztBQUFELENBQUMsQUFsQkQsQ0FBaUMsaUJBQU8sR0FrQnZDO0FBbEJZLGtDQUFXIn0=