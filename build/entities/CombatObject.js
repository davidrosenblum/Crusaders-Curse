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
    CombatObject.prototype.takeDamage = function (damage, damageType, ignoreDefense, ignoreResistance) {
        if (ignoreDefense === void 0) { ignoreDefense = false; }
        if (ignoreResistance === void 0) { ignoreResistance = false; }
        if (ignoreDefense || !this.rollDefense()) {
            if (!ignoreResistance) {
                if (damageType === 1 /* PHYSICAL */) {
                    damage -= (damage * this.physicalResistance);
                }
                else if (damageType === 2 /* MAGICAL */) {
                    damage -= (damage * this.magicalResistance);
                }
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
    CombatObject.prototype.addHealth = function (health) {
        if (health > 0) {
            this._health += health;
            if (this._health >= this.healthCap) {
                this._health = this.healthCap;
            }
        }
    };
    CombatObject.prototype.addMana = function (mana) {
        if (mana > 0) {
            this._mana += mana;
            if (this._mana >= this.manaCap) {
                this._mana = this.manaCap;
            }
        }
    };
    CombatObject.prototype.useMana = function (mana) {
        if (this.mana >= mana) {
            this._mana -= mana;
            return true;
        }
        return false;
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
    CombatObject.prototype.getCombatStats = function () {
        var stats = this.getBaseCombatStats();
        stats.health = this.health;
        stats.mana = this.mana;
        return stats;
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
    CombatObject.REGEN_INTERVAL = 1000;
    return CombatObject;
}(BaseCombatObject_1.BaseCombatObject));
exports.CombatObject = CombatObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYmF0T2JqZWN0LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvQ29tYmF0T2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFnSTtBQUVoSSxvQ0FBbUM7QUFTbkM7SUFBMkMsZ0NBQWdCO0lBZ0J2RCxzQkFBWSxNQUF5QjtRQUFyQyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQUtoQjtRQUhHLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztJQUMxQixDQUFDO0lBRU0saUNBQVUsR0FBakIsVUFBa0IsTUFBYSxFQUFFLFVBQXFCLEVBQUUsYUFBMkIsRUFBRSxnQkFBOEI7UUFBM0QsOEJBQUEsRUFBQSxxQkFBMkI7UUFBRSxpQ0FBQSxFQUFBLHdCQUE4QjtRQUMvRyxJQUFHLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQztZQUNwQyxJQUFHLENBQUMsZ0JBQWdCLEVBQUM7Z0JBQ2pCLElBQUcsVUFBVSxxQkFBd0IsRUFBQztvQkFDbEMsTUFBTSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNoRDtxQkFDSSxJQUFHLFVBQVUsb0JBQXVCLEVBQUM7b0JBQ3RDLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtZQUVELElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDO1lBRTVCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7Z0JB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