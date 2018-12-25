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
    return Player;
}(CasterObject_1.CasterObject));
exports.Player = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQVFsRTtJQUE0QiwwQkFBWTtJQVdwQyxnQkFBWSxRQUEwQixFQUFFLE1BQW1CO1FBQTNELFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBUWhCO1FBTkcsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkUsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEcsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDOztJQUN2QyxDQUFDO0lBRU8sNkJBQVksR0FBcEI7UUFDSSxPQUFPLENBQUMsSUFB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