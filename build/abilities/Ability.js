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
var events_1 = require("events");
var Ability = /** @class */ (function (_super) {
    __extends(Ability, _super);
    function Ability(config) {
        var _this = _super.call(this) || this;
        _this._level = Math.min(1, config.recharge);
        _this._manaCost = Math.min(0, config.recharge);
        _this._recharge = Math.min(0, config.recharge);
        _this._maxTargets = Math.min(1, config.maxTargets);
        _this._alwaysHit = _this._alwaysHit || false;
        _this._ready = true;
        return _this;
    }
    Ability.prototype.cast = function (caster, target, targets) {
        var _this = this;
        // validate the abiltiy is ready to cast
        if (!this.isReady) {
            throw new Error("Ability still recharging.");
        }
        // validate has enough mana
        if (caster.mana < this.manaCost) {
            throw new Error("Not enough mana.");
        }
        // validate target can be targetted
        if (!this.validateTarget(caster, target)) {
            throw new Error("Invalid target.");
        }
        // validate in range
        if (!caster.inRange(target, this.range)) {
            throw new Error("Target out of range.");
        }
        // consume mana and make ability no longer available
        target.useMana(this.manaCost);
        this._ready = false;
        // set recharge timeout 
        setTimeout(function () {
            _this._ready = true;
            _this.emit("recharged");
        }, this._recharge);
        // cast on primary target
        if (this.alwaysHit || !caster.rollDefense()) {
            // hit - effect primary target (successful cast)
            this.effect(target);
            // multiple target abilities
            if (this.maxTargets > 1) {
                this.castSubsequentTargets(caster, target, targets);
            }
        }
    };
    Ability.prototype.castSubsequentTargets = function (caster, starterTarget, targets) {
        var targetsRemaining = this.maxTargets - 1;
        for (var targetID in targets) {
            var nextTarget = targets[targetID];
            if (targetsRemaining > 0) {
                if (nextTarget === starterTarget) {
                    continue;
                }
                if (caster.inRange(nextTarget, this.range) && this.validateTarget(caster, nextTarget)) {
                    if (this.alwaysHit || !caster.rollDefense()) {
                        this.effect(nextTarget);
                    }
                    targetsRemaining--;
                }
            }
            else
                break;
        }
    };
    Ability.prototype.validateAlliesOnly = function (caster, target) {
        return (caster.team === target.team) && (caster !== target);
    };
    Ability.prototype.validateAlliesAndSelf = function (caster, target) {
        return (caster.team === target.team);
    };
    Ability.prototype.validateEnemiesOnly = function (caster, target) {
        return (caster.team !== target.team);
    };
    Object.defineProperty(Ability.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "manaCost", {
        get: function () {
            return this._manaCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "recharge", {
        get: function () {
            return this._recharge;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "range", {
        get: function () {
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "maxTargets", {
        get: function () {
            return this._maxTargets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "alwaysHit", {
        get: function () {
            return this._alwaysHit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ability.prototype, "isReady", {
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    Ability.UPGRADE_LEVEL_CAP = 3;
    return Ability;
}(events_1.EventEmitter));
exports.Ability = Ability;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImFiaWxpdGllcy9BYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFzQztBQVl0QztJQUFzQywyQkFBWTtJQVk5QyxpQkFBWSxNQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1FBQzNDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztJQUN2QixDQUFDO0lBRU0sc0JBQUksR0FBWCxVQUFZLE1BQW1CLEVBQUUsTUFBbUIsRUFBRSxPQUFtQztRQUF6RixpQkF5Q0M7UUF4Q0csd0NBQXdDO1FBQ3hDLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsMkJBQTJCO1FBQzNCLElBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2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