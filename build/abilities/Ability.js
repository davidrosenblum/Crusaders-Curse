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
        if (!this.isReady) {
            throw new Error("Ability still recharging.");
        }
        if (caster.mana < this.manaCost) {
            throw new Error("Not enough mana.");
        }
        if (!this.validateTarget(caster, target)) {
            throw new Error("Invalid target.");
        }
        if (!caster.inRange(target, this.range)) {
            throw new Error("Target out of range.");
        }
        this.effect(target);
        var targetsRemaining = this.maxTargets - 1;
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target_1 = targets_1[_i];
            if (targetsRemaining > 0) {
                if (caster.inRange(target_1, this.range) && this.validateTarget(caster, target_1)) {
                    if (this.alwaysHit || !caster.rollDefense()) {
                        this.effect(target_1);
                    }
                    targetsRemaining--;
                }
            }
        }
        this._ready = false;
        setTimeout(function () {
            _this._ready = true;
            _this.emit("recharged");
        }, this._recharge);
        return true;
    };
    Ability.prototype.validateAlliesOnly = function (caster, target) {
        return (caster.teamID === target.teamID) && (caster !== target);
    };
    Ability.prototype.validateAlliesAndSelf = function (caster, target) {
        return (caster.teamID === target.teamID);
    };
    Ability.prototype.validateEnemiesOnly = function (caster, target) {
        return (caster.teamID !== target.teamID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImFiaWxpdGllcy9BYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFzQztBQVl0QztJQUFzQywyQkFBWTtJQVk5QyxpQkFBWSxNQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1FBQzNDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztJQUN2QixDQUFDO0lBRU0sc0JBQUksR0FBWCxVQUFZLE1BQW1CLEVBQUUsTUFBbUIsRUFBRSxPQUFzQjtRQUE1RSxpQkF5Q0M7UUF4Q0csSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUM7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQztZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR3BCLElBQUksZ0JBQWdCLEdBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFbEQsS0FBa0IsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPLEVBQUM7WUFBdEIsSUFBSSxRQUFNLGdCQUFBO1lBQ1YsSUFBRyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUM7Z0JBQ3BCLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQU0sQ0FBQyxFQUFDO29CQUN6RSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUM7d0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBTSxDQUFDLENBQUM7cUJBQ3ZCO29CQUVELGdCQUFnQixFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sb0NBQWtCLEdBQXpCLFVBQTBCLE1BQW1CLEVBQUUsTUFBbUI7UUFDOUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx1Q0FBcUIsR0FBNUIsVUFBNkIsTUFBbUIsRUFBRSxNQUFtQjtRQUNqRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLHFDQUFtQixHQUExQixVQUEyQixNQUFtQixFQUFFLE1BQW1CO1FBQy9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBVUQsc0JBQVcsMEJBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw2QkFBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDZCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMEJBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBVTthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhCQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNEJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUEvR3NCLHlCQUFpQixHQUFVLENBQUMsQ0FBQztJQWdIeEQsY0FBQztDQUFBLEFBakhELENBQXNDLHFCQUFZLEdBaUhqRDtBQWpIcUIsMEJBQU8ifQ==