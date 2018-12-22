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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbWJhdE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL0Jhc2VDb21iYXRPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTREO0FBc0I1RDtJQUErQyxvQ0FBVTtJQWVyRCwwQkFBWSxNQUE2QjtRQUF6QyxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQWVoQjtRQWJHLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztRQUVsRCxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV0QyxLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDMUMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBRXBELEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUNqRCxLQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQzlELEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7O0lBQ2hFLENBQUM7SUFFRCxzQkFBVyx3Q0FBVTth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