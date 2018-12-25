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
var CombatObject_1 = require("./CombatObject");
var CasterObject = /** @class */ (function (_super) {
    __extends(CasterObject, _super);
    function CasterObject(config) {
        var _this = _super.call(this, config) || this;
        _this._abilities = {};
        for (var ability in config.abilities) {
            _this.learnAbility(ability, config.abilities[ability]);
        }
        _this._map = null;
        return _this;
    }
    CasterObject.prototype.learnAbility = function (abilityName, level) {
        if (level === void 0) { level = 1; }
        if (!this.hasAbility(abilityName)) {
            this._abilities[abilityName] = null; // instantiate spell here! 
        }
    };
    CasterObject.prototype.hasAbility = function (abilityName) {
        return abilityName in this._abilities;
    };
    CasterObject.prototype.setMap = function (map) {
        if (map.addUnit(this)) {
            this._map = map;
        }
    };
    Object.defineProperty(CasterObject.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    return CasterObject;
}(CombatObject_1.CombatObject));
exports.CasterObject = CasterObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzdGVyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvQ2FzdGVyT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQU9sRTtJQUEyQyxnQ0FBWTtJQUluRCxzQkFBWSxNQUF5QjtRQUFyQyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQVNoQjtRQVBHLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUksSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBQztZQUNoQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLFdBQWtCLEVBQUUsS0FBYztRQUFkLHNCQUFBLEVBQUEsU0FBYztRQUNsRCxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtTQUNuRTtJQUNMLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxPQUFPLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUFFTSw2QkFBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsc0JBQVcsNkJBQUc7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQW5DRCxDQUEyQywyQkFBWSxHQW1DdEQ7QUFuQ3FCLG9DQUFZIn0=