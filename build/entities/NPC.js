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
var NPC = /** @class */ (function (_super) {
    __extends(NPC, _super);
    function NPC(config) {
        var _this = _super.call(this, config) || this;
        _this._xpValue = config.xpValue;
        _this._goldValue = config.goldValue;
        _this._hasGivenBounty = false;
        return _this;
    }
    NPC.prototype.giveBounty = function (players) {
        if (!this._hasGivenBounty) {
            for (var player in players) {
                players[player].addXP(this.xpValue);
                players[player].addGold(this.goldValue);
            }
            this._hasGivenBounty = true;
        }
    };
    Object.defineProperty(NPC.prototype, "xpValue", {
        get: function () {
            return this._xpValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NPC.prototype, "goldValue", {
        get: function () {
            return this._goldValue;
        },
        enumerable: true,
        configurable: true
    });
    return NPC;
}(CasterObject_1.CasterObject));
exports.NPC = NPC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTlBDLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvTlBDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQVFsRTtJQUF5Qix1QkFBWTtJQUtqQyxhQUFZLE1BQWdCO1FBQTVCLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBS2hCO1FBSEcsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQzs7SUFDakMsQ0FBQztJQUVNLHdCQUFVLEdBQWpCLFVBQWtCLE9BQTZCO1FBQzNDLElBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDO1lBQ3JCLEtBQUksSUFBSSxNQUFNLElBQUksT0FBTyxFQUFDO2dCQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0M7WUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCxzQkFBVyx3QkFBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0wsVUFBQztBQUFELENBQUMsQUEvQkQsQ0FBeUIsMkJBQVksR0ErQnBDO0FBL0JZLGtCQUFHIn0=