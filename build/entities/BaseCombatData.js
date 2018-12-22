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
var GameObject_1 = require("./GameObject");
var CombatObject = /** @class */ (function (_super) {
    __extends(CombatObject, _super);
    function CombatObject(config) {
        var _this = _super.call(this, config) || this;
        _this.baseHealth = config.health || 1;
        _this.baseHealthRegen = config.healthRegen || 0.02;
        _this.baseMana = config.mana || 1;
        _this.baseManaRegen = config.manaRegen;
        _this._baseDefense = { melee: 0, ranged: 0 };
        _this.baseMeleeDefense = config.defense.melee || 0;
        _this.baseRangedDefense = config.defense.ranged || 0;
        _this._baseResistance = { physical: 0, magical: 0 };
        _this.basePhysicalResistance = config.resistance.physical || 0;
        _this.baseMagicalResistance = config.resistance.magical || 0;
        return _this;
    }
    Object.defineProperty(CombatObject.prototype, "baseHealth", {
        get: function () {
            return this._baseHealth;
        },
        set: function (baseHealth) {
            this._baseHealth = Math.max(0, Math.min(baseHealth, CombatObject.HEALTH_CAP));
            this.emit("combat-update", { baseHealth: baseHealth });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseHealthRegen", {
        get: function () {
            return this._baseHealthRegen;
        },
        set: function (baseHealthRegen) {
            this._baseHealthRegen = Math.max(0, Math.min(baseHealthRegen, CombatObject.HEALTH_REGEN_CAP));
            this.emit("combat-update", { baseHealthRegen: baseHealthRegen });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseMana", {
        get: function () {
            return this._baseMana;
        },
        set: function (baseMana) {
            this._baseMana = Math.max(0, Math.min(baseMana, CombatObject.MANA_CAP));
            this.emit("combat-update", { baseMana: baseMana });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseManaRegen", {
        get: function () {
            return this._baseManaRegen;
        },
        set: function (baseManaRegen) {
            this._baseManaRegen = Math.max(0, Math.min(baseManaRegen, CombatObject.HEALTH_REGEN_CAP));
            this.emit("combat-update", { baseManaRegen: baseManaRegen });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseMeleeDefense", {
        get: function () {
            return this._baseDefense.melee;
        },
        set: function (baseMeleeDefense) {
            this._baseDefense.melee = Math.max(0, Math.min(baseMeleeDefense, CombatObject.DEFENSE_CAP));
            this.emit("combat-update", { baseMeleeDefense: baseMeleeDefense });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseRangedDefense", {
        get: function () {
            return this._baseDefense.ranged;
        },
        set: function (baseRangedDefense) {
            this._baseDefense.ranged = Math.max(0, Math.min(baseRangedDefense, CombatObject.DEFENSE_CAP));
            this.emit("combat-update", { baseRangedDefense: baseRangedDefense });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "basePhysicalResistance", {
        get: function () {
            return this._baseResistance.physical;
        },
        set: function (basePhysicalResistance) {
            this._baseResistance.physical = Math.max(0, Math.min(basePhysicalResistance, CombatObject.RESISTANCE_CAP));
            this.emit("combat-update", { basePhysicalResistance: basePhysicalResistance });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CombatObject.prototype, "baseMagicalResistance", {
        get: function () {
            return this._baseResistance.magical;
        },
        set: function (baseMagicalResistance) {
            this._baseResistance.physical = Math.max(0, Math.min(baseMagicalResistance, CombatObject.RESISTANCE_CAP));
            this.emit("combat-update", { baseMagicalResistance: baseMagicalResistance });
        },
        enumerable: true,
        configurable: true
    });
    CombatObject.HEALTH_CAP = 9999;
    CombatObject.HEALTH_REGEN_CAP = 0.10;
    CombatObject.MANA_CAP = 9999;
    CombatObject.MANA_REGEN_CAP = 0.10;
    CombatObject.DEFENSE_CAP = 0.45;
    CombatObject.RESISTANCE_CAP = 0.90;
    return CombatObject;
}(GameObject_1.GameObject));
exports.CombatObject = CombatObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbWJhdERhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJlbnRpdGllcy9CYXNlQ29tYmF0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNEQ7QUFzQjVEO0lBQTJDLGdDQUFVO0lBZWpELHNCQUFZLE1BQXlCO1FBQXJDLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBZWhCO1FBYkcsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNyQyxLQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1FBRWxELEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakMsS0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXRDLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUMxQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2xELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFFcEQsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQ2pELEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDOUQsS0FBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQzs7SUFDaEUsQ0FBQztJQUVELHNCQUFXLG9DQUFVO2FBd0Ny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