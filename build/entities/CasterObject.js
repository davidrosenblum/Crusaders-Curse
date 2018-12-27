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
        if (map.addUnit(this) || map.hasUnit(this)) {
            this._map = map;
        }
    };
    CasterObject.prototype.getAbilities = function () {
        var abilityList = {};
        for (var abilityName in this._abilities) {
            var currAbility = this._abilities[abilityName];
            abilityList[abilityName] = {
                name: currAbility.name,
                level: currAbility.level,
                recharge: currAbility.recharge
            };
        }
        return abilityList;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzdGVyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvQ2FzdGVyT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQWNsRTtJQUEyQyxnQ0FBWTtJQUluRCxzQkFBWSxNQUF5QjtRQUFyQyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQVNoQjtRQVBHLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUksSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBQztZQUNoQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLFdBQWtCLEVBQUUsS0FBYztRQUFkLHNCQUFBLEVBQUEsU0FBYztRQUNsRCxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtTQUNuRTtJQUNMLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxPQUFPLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUFFTSw2QkFBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFTSxtQ0FBWSxHQUFuQjtRQUNJLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVyQixLQUFJLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDbkMsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV2RCxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ3ZCLElBQUksRUFBUSxXQUFXLENBQUMsSUFBSTtnQkFDNUIsS0FBSyxFQUFPLFdBQVcsQ0FBQyxLQUFLO2dCQUM3QixRQUFRLEVBQUksV0FBVyxDQUFDLFFBQVE7YUFDbkMsQ0FBQztTQUNMO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVELHNCQUFXLDZCQUFHO2FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBQUMsQUFuREQsQ0FBMkMsMkJBQVksR0FtRHREO0FBbkRxQixvQ0FBWSJ9