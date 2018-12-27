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
var CasterObject_1 = require("./CasterObject");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(saveData, config) {
        var _this = _super.call(this, config) || this;
        _this._level = Math.min(0, Math.max(saveData.level, Player.LEVEL_CAP));
        _this._xpNeeded = _this.calcXPNeeded();
        _this._xp = Math.min(0, Math.max(saveData.xp, _this._xpNeeded));
        _this._gold = Math.min(0, Math.max(saveData.gold, Player.GOLD_CAP));
        _this._abilityPoints = Math.min(0, Math.max(saveData.ability_points, Player.LEVEL_CAP - _this.level - 1));
        _this._archetype = config.archetype;
        _this._potions = {
            health: Math.min(0, Math.max(saveData.potions.health, Player.POTIONS_CAP)),
            mana: Math.min(0, Math.max(saveData.potions.mana, Player.POTIONS_CAP)),
            rage: Math.min(0, Math.max(saveData.potions.rage, Player.POTIONS_CAP)),
            luck: Math.min(0, Math.max(saveData.potions.luck, Player.POTIONS_CAP)),
            protection: Math.min(0, Math.max(saveData.potions.protection, Player.POTIONS_CAP))
        };
        return _this;
    }
    Player.prototype.calcXPNeeded = function () {
        return (this.level + 1) * (this.level + 2);
    };
    Player.prototype.levelUp = function () {
        if (this.level < Player.LEVEL_CAP) {
            this._level++;
            this._xpNeeded = (this.level + 1) * (this.level + 2);
            this._xp = 0;
            this.addAbilityPoints(1);
            this.emit("level", { level: this.level });
        }
    };
    Player.prototype.addAbilityPoints = function (points) {
        this._abilityPoints = Math.min(this.abilityPoints + points, Player.LEVEL_CAP - this.level);
        this.emit("ability-points", { abilityPoints: this.abilityPoints });
    };
    Player.prototype.addXP = function (xp) {
        var xpRemaining = xp;
        this.emit("xp", { xp: xp });
        while (xpRemaining >= this.xpToGo) {
            xpRemaining -= this.xpToGo;
            this.levelUp();
        }
        this._xp += xpRemaining;
    };
    Player.prototype.addGold = function (gold) {
        this._gold = Math.min(this.gold + gold, Player.GOLD_CAP);
        this.emit("gold", { gold: gold });
    };
    Player.prototype.getPotions = function () {
        return {
            health: this._potions.health,
            mana: this._potions.mana,
            rage: this._potions.rage,
            luck: this._potions.luck,
            protection: this._potions.protection
        };
    };
    Player.prototype.getPlayerState = function () {
        var state = this.getState();
        state.level = this.level;
        state.abilities = this.getAbilities();
        state.potions = this.getPotions();
        return state;
    };
    Object.defineProperty(Player.prototype, "xpToGo", {
        get: function () {
            return this._xpNeeded - this._xp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "xp", {
        get: function () {
            return this._xp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "xpNeeded", {
        get: function () {
            return this._xpNeeded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "abilityPoints", {
        get: function () {
            return this._abilityPoints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "archetype", {
        get: function () {
            return this._archetype;
        },
        enumerable: true,
        configurable: true
    });
    Player.LEVEL_CAP = 50;
    Player.GOLD_CAP = 999999;
    Player.POTIONS_CAP = 9;
    return Player;
}(CasterObject_1.CasterObject));
exports.Player = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQXVCbEU7SUFBNEIsMEJBQVk7SUFhcEMsZ0JBQVksUUFBMEIsRUFBRSxNQUFtQjtRQUEzRCxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQWVoQjtRQWJHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25FLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxLQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osTUFBTSxFQUFNLElBQUks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