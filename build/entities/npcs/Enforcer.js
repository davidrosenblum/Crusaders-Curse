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
var NPC_1 = require("../NPC");
var Enforcer = /** @class */ (function (_super) {
    __extends(Enforcer, _super);
    function Enforcer(x, y, anim, name) {
        return _super.call(this, {
            type: "enforcer" /* ENFORCER */,
            name: name || "Enforcer",
            team: "Raiders" /* RAIDERS */,
            moveSpeed: 1,
            health: 50,
            healthRegen: 0.02,
            mana: 100,
            manaRegen: 0.02,
            defense: {
                melee: 0.00,
                ranged: 0.00
            },
            resistance: {
                physical: 0.00,
                magical: 0.00
            },
            goldValue: 2,
            xpValue: 5,
            abilities: {},
            x: x,
            y: y,
            anim: anim
        }) || this;
    }
    return Enforcer;
}(NPC_1.NPC));
exports.Enforcer = Enforcer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5mb3JjZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJlbnRpdGllcy9ucGNzL0VuZm9yY2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQUE2QjtBQUU3QjtJQUE4Qiw0QkFBRztJQUM3QixrQkFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFBRSxJQUFZO2VBQ3hELGtCQUFNO1lBQ0YsSUFBSSwyQkFBNEI7WUFDaEMsSUFBSSxFQUFZLElBQUksSUFBSSxVQUFVO1lBQ2xDLElBQUkseUJBQXdCO1lBQzVCLFNBQVMsRUFBTyxDQUFDO1lBQ2pCLE1BQU0sRUFBVSxFQUFFO1lBQ2xCLFdBQVcsRUFBSyxJQUFJO1lBQ3BCLElBQUksRUFBWSxHQUFHO1lBQ25CLFNBQVMsRUFBTyxJQUFJO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQU8sSUFBSTtnQkFDaEIsTUFBTSxFQUFNLElBQUk7YUFDbkI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFJLElBQUk7Z0JBQ2hCLE9BQU8sRUFBSyxJQUFJO2FBQ25CO1lBQ0QsU0FBUyxFQUFPLENBQUM7WUFDakIsT0FBTyxFQUFTLENBQUM7WUFDakIsU0FBUyxFQUFFLEVBRVY7WUFDRCxDQUFDLEdBQUE7WUFDRCxDQUFDLEdBQUE7WUFDRCxJQUFJLE1BQUE7U0FDUCxDQUFDO0lBQ04sQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBN0JELENBQThCLFNBQUcsR0E2QmhDO0FBN0JZLDRCQUFRIn0=