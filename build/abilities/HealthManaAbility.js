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
var Ability_1 = require("./Ability");
var CasterObject_1 = require("../entities/CasterObject");
var HealthManaAbility = /** @class */ (function (_super) {
    __extends(HealthManaAbility, _super);
    function HealthManaAbility(config) {
        var _this = _super.call(this, config) || this;
        _this._healPercent = Math.min(0, Math.max(config.healthPercent), 1);
        _this._manaPercent = Math.min(0, Math.max(config.manaPercent), 1);
        _this._ticks = Math.min(0, config.ticks);
        return _this;
    }
    HealthManaAbility.prototype.effect = function (target) {
        if (this.ticks > 0) {
            this.effectWithTicks(target);
        }
        else {
            this.effectNoTicks(target);
        }
        return true;
    };
    HealthManaAbility.prototype.effectNoTicks = function (target) {
        var hp = target.healthCap / this.healthPercent;
        var mp = target.manaCap / this.manaPercent;
        target.addHealth(hp);
        target.addMana(mp);
    };
    HealthManaAbility.prototype.effectWithTicks = function (target) {
        var hp = (target.healthCap / this.healthPercent) / this.ticks;
        var mp = (target.manaCap / this.manaPercent) / this.ticks;
        // first tick is immediate
        target.addHealth(hp);
        target.addMana(mp);
        setTimeout(function () {
            target.addHealth(hp);
            target.addMana(mp);
        }, (this.ticks - 1) * CasterObject_1.CasterObject.REGEN_INTERVAL);
    };
    Object.defineProperty(HealthManaAbility.prototype, "healthPercent", {
        get: function () {
            return this._healPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthManaAbility.prototype, "manaPercent", {
        get: function () {
            return this._manaPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthManaAbility.prototype, "ticks", {
        get: function () {
            return this._ticks;
        },
        enumerable: true,
        configurable: true
    });
    return HealthManaAbility;
}(Ability_1.Ability));
exports.HealthManaAbility = HealthManaAbility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhbHRoTWFuYUFiaWxpdHkuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJhYmlsaXRpZXMvSGVhbHRoTWFuYUFiaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1EO0FBQ25ELHlEQUF3RDtBQVF4RDtJQUFnRCxxQ0FBTztJQUtuRCwyQkFBWSxNQUE4QjtRQUExQyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQUtoQjtRQUhHLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFDNUMsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxNQUFtQjtRQUM3QixJQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoQzthQUNHO1lBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5QjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx5Q0FBYSxHQUFyQixVQUFzQixNQUFtQjtRQUNyQyxJQUFJLEVBQUUsR0FBVSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDdEQsSUFBSSxFQUFFLEdBQVUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRWxELE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU8sMkNBQWUsR0FBdkIsVUFBd0IsTUFBbUI7UUFDdkMsSUFBSSxFQUFFLEdBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JFLElBQUksRUFBRSxHQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVqRSwwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLFVBQVUsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLDJCQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHNCQUFXLDRDQUFhO2FBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvQ0FBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXpERCxDQUFnRCxpQkFBTyxHQXlEdEQ7QUF6RHFCLDhDQUFpQiJ9