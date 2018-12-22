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
var BaseCombatObject_1 = require("./BaseCombatObject");
var RNG_1 = require("../utils/RNG");
var CombatObject = /** @class */ (function (_super) {
    __extends(CombatObject, _super);
    function CombatObject(config) {
        var _this = _super.call(this, config) || this;
        _this._health = _this.baseHealth;
        _this._mana = _this.baseMana;
        _this.resetModifiers();
        return _this;
    }
    CombatObject.prototype.takeDamage = function (damage, damageType) {
        if (!this.rollDefense()) {
            if (damageType === 1 /* PHYSICAL */) {
                damage -= (damage * this.physicalResistance);
            }
            else if (damageType === 2 /* MAGICAL */) {
                damage -= (damage * this.magicalResistance);
            }
            this._health -= damage;
            this.emit("hurt", { damage: damage });
            if (this.health <= 0) {
                this.emit("death");
            }
            return true;
        }
        this.emit("dodge");
        return false;
    };
    CombatObject.prototype.rollDefense = function (attackType) {
        if (attackType === void 0) { attackType = null; }
        var modifier = 0;
        if (attackType === 1 /* MELEE */) {
            modifier = this.meleeDefense;
        }
        else if (attackType === 2 /* RANGED */) {
            modifier = this.rangedDefense;
        }
        return RNG_1.RNG.nextNum() + modifier >= CombatObject.DEFENSE_ROLL_REQUIRED;
    };
    CombatObject.prototype.resetModifiers = function () {
        this._healthModifier = 0;
        this._healthRegenModifier = 0;
        this._manaModifier = 0;
        this._manaRegenModifier = 0;
        this._defenseModifier = { melee: 0, ranged: 0 };
        this._resistanceModifier = { physical: 0, magical: 0 };
        this._damageMultiplier = 1;
        this.emit("combat-update");
    };
    CombatObject.prototype.modifyHealth = function (healthModifier, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        this._healthModifier += healthModifier;
        setTimeout(function () {
            _this._healthModifier -= healthModifier;
            _this.emit("combat-update", { healthModifier: healthModifier });
        }, duration);
        this.emit("combat-update", { healthModifier: healthModifier });
    };
    CombatObject.prototype.modifyHealthRegen = function (healthRegenModifier, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        this._healthRegenModifier += healthRegenModifier;
        setTimeout(function () {
            _this._healthRegenModifier -= healthRegenModifier;
            _this.emit("combat-update", { healthRegenModifier: healthRegenModifier });
        }, duration);
        this.emit("combat-update", { healthRegenModifier: healthRegenModifier });
    };
    CombatObject.prototype.modifyMana = function (manaModifier, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        this._manaModifier += manaModifier;
        setTimeout(function () {
            _this._manaModifier -= manaModifier;
            _this.emit("combat-update", { manaModifier: manaModifier });
        }, duration);
        this.emit("combat-update", { manaModifier: manaModifier });
    };
    CombatObject.prototype.modifyManaRegen = function (manaRegenModifier, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        this._manaRegenModifier += manaRegenModifier;
        setTimeout(function () {
            _this._manaRegenModifier -= manaRegenModifier;
            _this.emit("combat-update", { manaRegenModifier: manaRegenModifier });
        }, duration);
        this.emit("combat-update", { manaRegenModifier: manaRegenModifier });
    };
    CombatObject.prototype.modifyDefense = function (defenseModifier, defenseType, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        var melee = (defenseType === 1 /* MELEE */ || defenseType === "all") ? defenseModifier : 0;
        var ranged = (defenseType === 2 /* RANGED */ || defenseType === "all") ? defenseModifier : 0;
        this._defenseModifier.melee += melee;
        this._defenseModifier.ranged += ranged;
        setTimeout(function () {
            _this._defenseModifier.melee -= melee;
            _this._defenseModifier.ranged -= ranged;
            _this.emit("combat-update", { meleeDefenseModifier: melee, rangedDefenseModifier: ranged });
        }, duration);
        this.emit("combat-update", { meleeDefenseModifier: melee, rangedDefenseModifier: ranged });
    };
    CombatObject.prototype.modifyResistance = function (resistanceModifier, resistanceType, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        var physical = (resistanceType === 1 /* PHYSICAL */ || resistanceType === "all") ? resistanceModifier : 0;
        var magical = (resistanceType === 2 /* MAGICAL */ || resistanceType === "all") ? resistanceModifier : 0;
        this._resistanceModifier.physical += physical;
        this._resistanceModifier.magical += magical;
        setTimeout(function () {
            _this._resistanceModifier.physical -= physical;
            _this._resistanceModifier.magical -= magical;
            _this.emit("combat-update", { physicalResistanceModifier: physical, magicalResistanceModifier: magical });
        }, duration);
        this.emit("combat-update", { physicalResistanceModifier: physical, magicalResistanceModifier: magical });
    };
    CombatObject.prototype.modifyDamage = function (damageModifier, duration) {
        var _this = this;
        if (duration === void 0) { duration = CombatObject.DEFAULT_DURATION; }
        this._damageMultiplier += damageModifier;
        setTimeout(function () {
            _this._damageMultiplier -= damageModifier;
            _this.emit("combat-update", { damageModifier: damageModifier });
        }, duration);
        this.emit("combat-update", { damageModifier: damageModifier });
    };
    Object.defineProperty(CombatObject.prototype, "healthModifier", {
        get: function () {
            return this._healthModifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "healthRegenModifier", {
        get: function () {
            return Math.max(0, this._healthRegenModifier);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "manaModifier", {
        get: function () {
            return this._manaModifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "manaRegenModifier", {
        get: function () {
            return Math.max(0, this._manaRegenModifier);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "meleeDefenseModifier", {
        get: function () {
            return Math.max(0, this._defenseModifier.melee);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "rangedDefenseModifier", {
        get: function () {
            return Math.max(0, this._defenseModifier.ranged);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "physicalResistanceModifier", {
        get: function () {
            return Math.max(0, this._resistanceModifier.physical);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "magicalResistanceModifier", {
        get: function () {
            return Math.max(0, this._resistanceModifier.magical);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "damageMultiplier", {
        get: function () {
            return Math.min(this._damageMultiplier, CombatObject.DAMAGE_MULTIPLIER_CAP);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "health", {
        get: function () {
            return Math.max(0, Math.min(this._health, this.healthCap));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "healthCap", {
        get: function () {
            return Math.max(0, Math.min(this.baseHealth + this.healthModifier, CombatObject.HEALTH_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "healthRegen", {
        get: function () {
            return Math.max(0, Math.min(this.baseHealthRegen + this.healthRegenModifier, CombatObject.HEALTH_REGEN_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "mana", {
        get: function () {
            return Math.max(0, Math.min(this._mana, this.manaCap));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "manaCap", {
        get: function () {
            return Math.max(0, Math.min(this.baseMana + this.manaModifier, CombatObject.MANA_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "manaRegen", {
        get: function () {
            return Math.max(0, Math.min(this.baseManaRegen + this.manaRegenModifier, CombatObject.MANA_REGEN_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "meleeDefense", {
        get: function () {
            return Math.max(0, Math.min(this.baseMeleeDefense + this.meleeDefenseModifier, CombatObject.DEFENSE_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "rangedDefense", {
        get: function () {
            return Math.max(0, Math.min(this.baseRangedDefense + this.rangedDefenseModifier, CombatObject.DEFENSE_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "physicalResistance", {
        get: function () {
            return Math.max(0, Math.min(this.basePhysicalResistance + this.physicalResistanceModifier, CombatObject.RESISTANCE_CAP));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "magicalResistance", {
        get: function () {
            return Math.max(0, Math.min(this.baseMagicalResistance + this.magicalResistance, CombatObject.RESISTANCE_CAP));
        },
        enumerable: true,
        configurable: true
    });
    CombatObject.DAMAGE_MULTIPLIER_CAP = 2.75;
    CombatObject.DEFAULT_DURATION = 5000;
    CombatObject.DEFENSE_ROLL_REQUIRED = 0.85;
    return CombatObject;
}(BaseCombatObject_1.BaseCombatObject));
exports.CombatObject = CombatObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYmF0T2JqZWN0LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvQ29tYmF0T2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUErRztBQUUvRyxvQ0FBbUM7QUFJbkM7SUFBMkMsZ0NBQWdCO0lBZXZELHNCQUFZLE1BQXlCO1FBQXJDLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBS2hCO1FBSEcsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztRQUMzQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQzFCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixNQUFhLEVBQUUsVUFBcUI7UUFDbEQsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQztZQUNuQixJQUFHLFVBQVUscUJBQXdCLEVBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNoRDtpQkFDSSxJQUFHLFVBQVUsb0JBQXVCLEVBQUM7Z0JBQ3RDLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUMvQztZQUVELElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDO1lBRTVCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEI7WUFFRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBbUIsVUFBMEI7UUFBMUIsMkJBQUEsRUFBQSxpQkFBMEI7UUFDekMsSUFBSSxRQUFRLEdBQVUsQ0FBQyxDQUFDO1FBRXhCLElBQUcsVUFBVSxrQkFBcUIsRUFBQztZQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUNoQzthQUNJLElBQUcsVUFBVSxtQkFBc0IsRUFBQztZQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNqQztRQUVELE9BQU8sU0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsSUFBSSxZQUFZLENBQUMscUJBQXFCLENBQUM7SUFDMUUsQ0FBQztJQUVNLHFDQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sbUNBQVksR0FBbkIsVUFBb0IsY0FBcUIsRUFBRSxRQUE2QztRQUF4RixpQkFTQztRQVQwQyx5QkFBQSxFQUFBLFdBQWdCLFlBQVksQ0FBQyxnQkFBZ0I7UUFDcEYsSUFBSSxDQUFDLGVBQWUsSUFBSSxjQUFjLENBQUM7UUFFdkMsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGVBQWUsSUFBSSxjQUFjLENBQUE7WUFDdEMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQyxjQUFjLGdCQUFBLEVBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsY0FBYyxnQkFBQSxFQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sd0NBQWlCLEdBQXhCLFVBQXlCLG1CQUEwQixFQUFFLFFBQTZDO1FBQWxHLGlCQVNDO1FBVG9ELHlCQUFBLEVBQUEsV0FBZ0IsWUFBWSxDQUFDLGdCQUFnQjtRQUM5RixJQUFJLENBQUMsb0JBQW9CLElBQUksbUJBQW1CLENBQUM7UUFFakQsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLG9CQUFvQixJQUFJLG1CQUFtQixDQUFBO1lBQ2hELEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsbUJBQW1CLHFCQUFBLEVBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsbUJBQW1CLHFCQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixZQUFtQixFQUFFLFFBQTZDO1FBQXBGLGlCQVNDO1FBVHNDLHlCQUFBLEVBQUEsV0FBZ0IsWUFBWSxDQUFDLGdCQUFnQjtRQUNoRixJQUFJLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQztRQUVuQyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQTtZQUNsQyxLQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLFlBQVksY0FBQSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLFlBQVksY0FBQSxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sc0NBQWUsR0FBdEIsVUFBdUIsaUJBQXdCLEVBQUUsUUFBNkM7UUFBOUYsaUJBU0M7UUFUZ0QseUJBQUEsRUFBQSxXQUFnQixZQUFZLENBQUMsZ0JBQWdCO1FBQzFGLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxpQkFBaUIsQ0FBQztRQUU3QyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsa0JBQWtCLElBQUksaUJBQWlCLENBQUE7WUFDNUMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQyxpQkFBaUIsbUJBQUEsRUFBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQyxpQkFBaUIsbUJBQUEsRUFBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLGVBQXNCLEVBQUcsV0FBNEIsRUFBRSxRQUE2QztRQUF6SCxpQkFjQztRQWQyRSx5QkFBQSxFQUFBLFdBQWdCLFlBQVksQ0FBQyxnQkFBZ0I7UUFDckgsSUFBSSxLQUFLLEdBQVUsQ0FBQyxXQUFXLGtCQUFzQixJQUFJLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEcsSUFBSSxNQUFNLEdBQVUsQ0FBQyxXQUFXLG1CQUF1QixJQUFJLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7UUFFdkMsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7WUFDckMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7WUFDdkMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0Isa0JBQXlCLEVBQUcsY0FBK0IsRUFBRSxRQUE2QztRQUFsSSxpQkFjQztRQWRvRix5QkFBQSxFQUFBLFdBQWdCLFlBQVksQ0FBQyxnQkFBZ0I7UUFDOUgsSUFBSSxRQUFRLEdBQVUsQ0FBQyxjQUFjLHFCQUF3QixJQUFJLGNBQWMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwSCxJQUFJLE9BQU8sR0FBVSxDQUFDLGNBQWMsb0JBQXVCLElBQUksY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDO1FBRTVDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO1lBQzlDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDM0csQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQywwQkFBMEIsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRU0sbUNBQVksR0FBbkIsVUFBb0IsY0FBcUIsRUFBRSxRQUE2QztRQUF4RixpQkFTQztRQVQwQyx5QkFBQSxFQUFBLFdBQWdCLFlBQVksQ0FBQyxnQkFBZ0I7UUFDcEYsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGNBQWMsQ0FBQztRQUV6QyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsaUJBQWlCLElBQUksY0FBYyxDQUFBO1lBQ3hDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsY0FBYyxnQkFBQSxFQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLGNBQWMsZ0JBQUEsRUFBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHNCQUFXLHdDQUFjO2FBQXpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkNBQW1CO2FBQTlCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMkNBQWlCO2FBQTVCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhDQUFvQjthQUEvQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0NBQXFCO2FBQWhDO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvREFBMEI7YUFBckM7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1EQUF5QjthQUFwQztZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQWdCO2FBQTNCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakcsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBVzthQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2pILENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaUNBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDM0csQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlHLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsdUNBQWE7YUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRDQUFrQjthQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzdILENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMkNBQWlCO2FBQTVCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkgsQ0FBQzs7O09BQUE7SUF4T3NCLGtDQUFxQixHQUFVLElBQUksQ0FBQztJQUNwQyw2QkFBZ0IsR0FBVSxJQUFJLENBQUM7SUFDL0Isa0NBQXFCLEdBQVUsSUFBSSxDQUFDO0lBdU8vRCxtQkFBQztDQUFBLEFBMU9ELENBQTJDLG1DQUFnQixHQTBPMUQ7QUExT3FCLG9DQUFZIn0=