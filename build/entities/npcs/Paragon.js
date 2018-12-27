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
    function Paragon(col, row, anim, name) {
        if (col === void 0) { col = 0; }
        if (row === void 0) { row = 0; }
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
            spawnCoords: { row: row, col: col },
            anim: anim
        }) || this;
    }
    return Paragon;
}(NPC_1.NPC));
exports.Paragon = Paragon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyYWdvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL25wY3MvUGFyYWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkFBNkI7QUFFN0I7SUFBNkIsMkJBQUc7SUFDNUIsaUJBQVksR0FBWSxFQUFFLEdBQVksRUFBRSxJQUFZLEVBQUUsSUFBWTtRQUF0RCxvQkFBQSxFQUFBLE9BQVk7UUFBRSxvQkFBQSxFQUFBLE9BQVk7ZUFDbEMsa0JBQU07WUFDRixJQUFJLHlCQUEyQjtZQUMvQixJQUFJLEVBQVksSUFBSSxJQUFJLFNBQVM7WUFDakMsSUFBSSxvQ0FBNkI7WUFDakMsU0FBUyxFQUFPLENBQUM7WUFDakIsTUFBTSxFQUFVLE9BQU8sQ0FBQyxVQUFVO1lBQ2xDLFdBQVcsRUFBSyxPQUFPLENBQUMsZ0JBQWdCO1lBQ3hDLElBQUksRUFBWSxPQUFPLENBQUMsUUFBUTtZQUNoQyxTQUFTLEVBQU8sT0FBTyxDQUFDLGNBQWM7WUFDdEMsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBTyxPQUFPLENBQUMsV0FBVztnQkFDL0IsTUFBTSxFQUFNLE9BQU8sQ0FBQyxXQUFXO2FBQ2xDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFFBQVEsRUFBSSxPQUFPLENBQUMsY0FBYztnQkFDbEMsT0FBTyxFQUFLLE9BQU8sQ0FBQyxjQUFjO2FBQ3JDO1lBQ0QsU0FBUyxFQUFPLENBQUM7WUFDakIsT0FBTyxFQUFTLENBQUM7WUFDakIsU0FBUyxFQUFFLEVBRVY7WUFDRCxXQUFXLEVBQUUsRUFBQyxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBQztZQUN2QixJQUFJLE1BQUE7U0FDUCxDQUFDO0lBQ04sQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBNUJELENBQTZCLFNBQUcsR0E0Qi9CO0FBNUJZLDBCQUFPIn0=