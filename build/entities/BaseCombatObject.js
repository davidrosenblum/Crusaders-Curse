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
var BaseCombatObject = /** @class */ (function (_super) {
    __extends(BaseCombatObject, _super);
    function BaseCombatObject(config) {
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
    BaseCombatObject.prototype.getBaseCombatStats = function () {
        return {
            baseHealth: this.baseHealth,
            baseHealthRegen: this.baseHealthRegen,
            baseMana: this.baseMana,
            baseManaRegen: this.baseManaRegen,
            baseMeleeDefense: this.baseMeleeDefense,
            baseRangedDefense: this.baseRangedDefense,
            basePhysicalResistance: this.basePhysicalResistance,
            baseMagicalResistance: this.baseMagicalResistance
        };
    };
    Object.defineProperty(BaseCombatObject.prototype, "baseHealth", {
        get: function () {
            return this._baseHealth;
        },
        set: function (baseHealth) {
            this._baseHealth = Math.max(0, Math.min(baseHealth, BaseCombatObject.HEALTH_CAP));
            this.emit("combat-update", { baseHealth: baseHealth });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseHealthRegen", {
        get: function () {
            return this._baseHealthRegen;
        },
        set: function (baseHealthRegen) {
            this._baseHealthRegen = Math.max(0, Math.min(baseHealthRegen, BaseCombatObject.HEALTH_REGEN_CAP));
            this.emit("combat-update", { baseHealthRegen: baseHealthRegen });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseMana", {
        get: function () {
            return this._baseMana;
        },
        set: function (baseMana) {
            this._baseMana = Math.max(0, Math.min(baseMana, BaseCombatObject.MANA_CAP));
            this.emit("combat-update", { baseMana: baseMana });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseManaRegen", {
        get: function () {
            return this._baseManaRegen;
        },
        set: function (baseManaRegen) {
            this._baseManaRegen = Math.max(0, Math.min(baseManaRegen, BaseCombatObject.HEALTH_REGEN_CAP));
            this.emit("combat-update", { baseManaRegen: baseManaRegen });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseMeleeDefense", {
        get: function () {
            return this._baseDefense.melee;
        },
        set: function (baseMeleeDefense) {
            this._baseDefense.melee = Math.max(0, Math.min(baseMeleeDefense, BaseCombatObject.DEFENSE_CAP));
            this.emit("combat-update", { baseMeleeDefense: baseMeleeDefense });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseRangedDefense", {
        get: function () {
            return this._baseDefense.ranged;
        },
        set: function (baseRangedDefense) {
            this._baseDefense.ranged = Math.max(0, Math.min(baseRangedDefense, BaseCombatObject.DEFENSE_CAP));
            this.emit("combat-update", { baseRangedDefense: baseRangedDefense });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "basePhysicalResistance", {
        get: function () {
            return this._baseResistance.physical;
        },
        set: function (basePhysicalResistance) {
            this._baseResistance.physical = Math.max(0, Math.min(basePhysicalResistance, BaseCombatObject.RESISTANCE_CAP));
            this.emit("combat-update", { basePhysicalResistance: basePhysicalResistance });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombatObject.prototype, "baseMagicalResistance", {
        get: function () {
            return this._baseResistance.magical;
        },
        set: function (baseMagicalResistance) {
            this._baseResistance.physical = Math.max(0, Math.min(baseMagicalResistance, BaseCombatObject.RESISTANCE_CAP));
            this.emit("combat-update", { baseMagicalResistance: baseMagicalResistance });
        },
        enumerable: true,
        configurable: true
    });
    BaseCombatObject.HEALTH_CAP = 9999;
    BaseCombatObject.HEALTH_REGEN_CAP = 0.10;
    BaseCombatObject.MANA_CAP = 9999;
    BaseCombatObject.MANA_REGEN_CAP = 0.10;
    BaseCombatObject.DEFENSE_CAP = 0.45;
    BaseCombatObject.RESISTANCE_CAP = 0.90;
    return BaseCombatObject;
}(GameObject_1.GameObject));
exports.BaseCombatObject = BaseCombatObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbWJhdE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL0Jhc2VDb21iYXRPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTREO0FBaUM1RDtJQUErQyxvQ0FBVTtJQWVyRCwwQkFBWSxNQUE2QjtRQUF6QyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQWVoQjtRQWJHLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztRQUVsRCxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV0QyxLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDMUMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBRXBELEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUNqRCxLQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQzlELEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7O0lBQ2hFLENBQUM7SUFFTSw2Q0FBa0IsR0FBekI7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