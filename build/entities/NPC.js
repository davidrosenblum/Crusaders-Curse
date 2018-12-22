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
        return _this;
    }
    NPC.prototype.giveBounty = function (players) {
        for (var player in players) {
            players[player].addXP(this.xpValue);
            players[player].addGold(this.goldValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTlBDLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZW50aXRpZXMvTlBDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRTtBQVFsRTtJQUF5Qix1QkFBWTtJQUlqQyxhQUFZLE1BQWdCO1FBQTVCLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLFNBSWhCO1FBRkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7SUFDdkMsQ0FBQztJQUVNLHdCQUFVLEdBQWpCLFVBQWtCLE9BQTZCO1FBQzNDLEtBQUksSUFBSSxNQUFNLElBQUksT0FBTyxFQUFDO1lBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVELHNCQUFXLHdCQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMEJBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDTCxVQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUF5QiwyQkFBWSxHQXlCcEM7QUF6Qlksa0JBQUcifQ==