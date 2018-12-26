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
var ModifierAbility = /** @class */ (function (_super) {
    __extends(ModifierAbility, _super);
    function ModifierAbility(config) {
        var _this = _super.call(this, config) || this;
        _this._maxHealth = config.maxHealth || 0;
        _this._maxMana = config.maxMana || 0;
        _this._healthRegen = config.healthRegen || 0;
        _this._manaRegen = config.manaRegen || 0;
        _this._defense = {
            melee: config.meleeDefense || 0,
            ranged: config.rangedDefense || 0
        };
        _this._resistance = {
            physical: config.physicalResistance || 0,
            magical: config.magicalResistance || 0
        };
        _this._damage = config.damage || 0;
        _this._duration = Math.min(0, config.duration);
        return _this;
    }
    ModifierAbility.prototype.effect = function (target) {
        if (this.alwaysHit || !target.rollDefense()) {
            if (this.maxHealth !== 0) {
                target.modifyHealth(this.maxHealth, this.duration);
            }
            if (this.maxMana !== 0) {
                target.modifyHealth(this.maxMana, this.duration);
            }
            if (this.healthRegen !== 0) {
                target.modifyHealthRegen(this.healthRegen, this.duration);
            }
            if (this.manaRegen !== 0) {
                target.modifyManaRegen(this.manaRegen, this.duration);
            }
            if (this.defense.melee !== 0) {
                target.modifyDefense(this.defense.melee, 1 /* MELEE */, this.duration);
            }
            if (this.defense.ranged !== 0) {
                target.modifyDefense(this.defense.ranged, 2 /* RANGED */, this.duration);
            }
            if (this.resistance.physical !== 0) {
                target.modifyResistance(this.resistance.magical, 1 /* PHYSICAL */, this.duration);
            }
            if (this.resistance.magical !== 0) {
                target.modifyResistance(this.resistance.magical, 2 /* MAGICAL */, this.duration);
            }
            if (this.damage !== 0) {
                target.modifyDamage(this.damage, this.duration);
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(ModifierAbility.prototype, "maxHealth", {
        get: function () {
            return this._maxHealth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "maxMana", {
        get: function () {
            return this._maxMana;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "healthRegen", {
        get: function () {
            return this._healthRegen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "manaRegen", {
        get: function () {
            return this._manaRegen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "defense", {
        get: function () {
            return this._defense;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "resistance", {
        get: function () {
            return this._resistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "damage", {
        get: function () {
            return this._damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModifierAbility.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    return ModifierAbility;
}(Ability_1.Ability));
exports.ModifierAbility = ModifierAbility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kaWZpZXJBYmlsaXR5LmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiYWJpbGl0aWVzL01vZGlmaWVyQWJpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBbUQ7QUFrQm5EO0lBQThDLG1DQUFPO0lBVWpELHlCQUFZLE1BQTRCO1FBQXhDLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBZ0JoQjtRQWRHLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDeEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNwQyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzVDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDeEMsS0FBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxJQUFJLENBQUM7WUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFhLElBQUksQ0FBQztTQUNwQyxDQUFDO1FBQ0YsS0FBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFFBQVEsRUFBRSxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQztZQUN4QyxPQUFPLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixJQUFJLENBQUM7U0FDekMsQ0FBQztRQUNGLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBQ2xELENBQUM7SUFFTSxnQ0FBTSxHQUFiLFVBQWMsTUFBbUI7UUFDN0IsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJ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