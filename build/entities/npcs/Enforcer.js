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
    function Enforcer(col, row, anim, name) {
        if (col === void 0) { col = 0; }
        if (row === void 0) { row = 0; }
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
            spawnCoords: { row: row, col: col },
            anim: anim
        }) || this;
    }
    return Enforcer;
}(NPC_1.NPC));
exports.Enforcer = Enforcer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5mb3JjZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJlbnRpdGllcy9ucGNzL0VuZm9yY2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQUE2QjtBQUU3QjtJQUE4Qiw0QkFBRztJQUM3QixrQkFBWSxHQUFZLEVBQUUsR0FBWSxFQUFFLElBQVksRUFBRSxJQUFZO1FBQXRELG9CQUFBLEVBQUEsT0FBWTtRQUFFLG9CQUFBLEVBQUEsT0FBWTtlQUNsQyxrQkFBTTtZQUNGLElBQUksMkJBQTRCO1lBQ2hDLElBQUksRUFBWSxJQUFJLElBQUksVUFBVTtZQUNsQyxJQUFJLHlCQUF3QjtZQUM1QixTQUFTLEVBQU8sQ0FBQztZQUNqQixNQUFNLEVBQVUsRUFBRTtZQUNsQixXQUFXLEVBQUssSUFBSTtZQUNwQixJQUFJLEVBQVksR0FBRztZQUNuQixTQUFTLEVBQU8sSUFBSTtZQUNwQixPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFPLElBQUk7Z0JBQ2hCLE1BQU0sRUFBTSxJQUFJO2FBQ25CO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFFBQVEsRUFBSSxJQUFJO2dCQUNoQixPQUFPLEVBQUssSUFBSTthQUNuQjtZQUNELFNBQVMsRUFBTyxDQUFDO1lBQ2pCLE9BQU8sRUFBUyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxFQUVWO1lBQ0QsV0FBVyxFQUFFLEVBQUMsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUM7WUFDdkIsSUFBSSxNQUFBO1NBQ1AsQ0FBQztJQUNOLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQTVCRCxDQUE4QixTQUFHLEdBNEJoQztBQTVCWSw0QkFBUSJ9