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
    CasterObject.prototype.castAbility = function (abilityName, target, targets) {
        if (this.hasAbility(abilityName)) {
            var ability = this._abilities[abilityName];
            ability.cast(this, target, targets);
        }
        else
            throw new Error("Ability cast error - missing ability \"" + abilityName + "\".");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzdGVyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvQ2FzdGVyT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQWNsRTtJQUEyQyxnQ0FBWTtJQUluRCxzQkFBWSxNQUF5QjtRQUFyQyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQVNoQjtRQVBHLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUksSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBQztZQUNoQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLFdBQWtCLEVBQUUsS0FBYztRQUFkLHNCQUFBLEVBQUEsU0FBYztRQUNsRCxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtTQUNuRTtJQUNMLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxPQUFPLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUFFTSxrQ0FBVyxHQUFsQixVQUFtQixXQUFrQixFQUFFLE1BQW1CLEVBQUUsT0FBbUM7UUFDM0YsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFDO1lBQzVCLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDOztZQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQXlDLFdBQVcsUUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVNLDZCQUFNLEdBQWIsVUFBYyxHQUFXO1FBQ3JCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVNLG1DQUFZLEdBQW5CO1FBQ0ksSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUksSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNuQyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXZELFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRztnQkFDdkIsSUFBSSxFQUFRLFdBQVcsQ0FBQyxJQUFJO2dCQUM1QixLQUFLLEVBQU8sV0FBVyxDQUFDLEtBQUs7Z0JBQzdCLFFBQVEsRUFBSSxXQUFXLENBQUMsUUFBUTthQUNuQyxDQUFDO1NBQ0w7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQVcsNkJBQUc7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTVERCxDQUEyQywyQkFBWSxHQTREdEQ7QUE1RHFCLG9DQUFZIn0=