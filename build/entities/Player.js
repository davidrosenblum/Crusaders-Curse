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
var Data_1 = require("../data/Data");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(saveData, config) {
        var _this = _super.call(this, config) || this;
        _this._level = 1;
        _this._xp = 0;
        _this._gold = 0;
        _this._abilityPoints = 0;
        return _this;
    }
    Player.prototype.levelUp = function () {
        if (this.level < Player.LEVEL_CAP) {
            this._xpNeeded = (this.level + 1) * (this.level + 2);
            this._xp = 0;
            this._level++;
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
    Player.createRanger = function (saveData) {
        return new Player(saveData, {
            name: saveData.name,
            type: "player",
            archetype: Data_1.getArchetypeName(20 /* RANGER */),
            health: 100,
            mana: 100,
            moveSpeed: 1,
        });
    };
    Player.LEVEL_CAP = 50;
    Player.GOLD_CAP = 999999;
    return Player;
}(CasterObject_1.CasterObject));
exports.Player = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQUVsRSxxQ0FBMkQ7QUFNM0Q7SUFBNEIsMEJBQVk7SUFXcEMsZ0JBQW9CLFFBQTBCLEVBQUUsTUFBbUI7UUFBbkUsWUFDSSxrQkFBTSxNQUFNLENBQUMsU0FNaEI7UUFKRyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsS0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7O0lBQzVCLENBQUM7SUFFTyx3QkFBTyxHQUFmO1FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVNLGlDQUFnQixHQUF2QixVQUF3QixNQUFhO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsRUFBUztRQUNsQixJQUFJLFdBQVcsR0FBVSxFQUFFLENBQUM7UUFFNUIsT0FBTSxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBQztZQUM3QixXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRU0sd0JBQU8sR0FBZCxVQUFlLElBQVc7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksTUFBQSxFQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0JBQVcsMEJBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHlCQUFLO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0JBQUU7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsd0JBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlDQUFhO2FBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRWEsbUJBQVksR0FBMUIsVUFBMkIsUUFBMEI7UUFDakQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLHVCQUFnQixpQkFBa0I7WUFDN0MsTUFBTSxFQUFFLEdBQUc7WUFDWCxJQUFJLEVBQUUsR0FBRztZQUNULFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5Gc0IsZ0JBQVMsR0FBVSxFQUFFLENBQUM7SUFDdEIsZUFBUSxHQUFVLE1BQU0sQ0FBQztJQW1GcEQsYUFBQztDQUFBLEFBckZELENBQTRCLDJCQUFZLEdBcUZ2QztBQXJGWSx3QkFBTSJ9