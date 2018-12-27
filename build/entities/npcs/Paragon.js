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
var Paragon = /** @class */ (function (_super) {
    __extends(Paragon, _super);
    function Paragon(x, y, anim, name) {
        return _super.call(this, {
            type: "paragon" /* PARAGON */,
            name: name || "Paragon",
            team: "King's Legion" /* KINGS_LEGION */,
            moveSpeed: 1,
            health: Paragon.HEALTH_CAP,
            healthRegen: Paragon.HEALTH_REGEN_CAP,
            mana: Paragon.MANA_CAP,
            manaRegen: Paragon.MANA_REGEN_CAP,
            defense: {
                melee: Paragon.DEFENSE_CAP,
                ranged: Paragon.DEFENSE_CAP
            },
            resistance: {
                physical: Paragon.RESISTANCE_CAP,
                magical: Paragon.RESISTANCE_CAP
            },
            goldValue: 0,
            xpValue: 0,
            abilities: {},
            x: x,
            y: y,
            anim: anim
        }) || this;
    }
    return Paragon;
}(NPC_1.NPC));
exports.Paragon = Paragon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyYWdvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL25wY3MvUGFyYWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkFBNkI7QUFFN0I7SUFBNkIsMkJBQUc7SUFDNUIsaUJBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEVBQUUsSUFBWTtlQUN4RCxrQkFBTTtZQUNGLElBQUkseUJBQTJCO1lBQy9CLElBQUksRUFBWSxJQUFJLElBQUksU0FBUztZQUNqQyxJQUFJLG9DQUE2QjtZQUNqQyxTQUFTLEVBQU8sQ0FBQztZQUNqQixNQUFNLEVBQVUsT0FBTyxDQUFDLFVBQVU7WUFDbEMsV0FBVyxFQUFLLE9BQU8sQ0FBQyxnQkFBZ0I7WUFDeEMsSUFBSSxFQUFZLE9BQU8sQ0FBQyxRQUFRO1lBQ2hDLFNBQVMsRUFBTyxPQUFPLENBQUMsY0FBYztZQUN0QyxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFPLE9BQU8sQ0FBQyxXQUFXO2dCQUMvQixNQUFNLEVBQU0sT0FBTyxDQUFDLFdBQVc7YUFDbEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFJLE9BQU8sQ0FBQyxjQUFjO2dCQUNsQyxPQUFPLEVBQUssT0FBTyxDQUFDLGNBQWM7YUFDckM7WUFDRCxTQUFTLEVBQU8sQ0FBQztZQUNqQixPQUFPLEVBQVMsQ0FBQztZQUNqQixTQUFTLEVBQUUsRUFFVjtZQUNELENBQUMsR0FBQTtZQUNELENBQUMsR0FBQTtZQUNELElBQUksTUFBQTtTQUNQLENBQUM7SUFDTixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUE3QkQsQ0FBNkIsU0FBRyxHQTZCL0I7QUE3QlksMEJBQU8ifQ==