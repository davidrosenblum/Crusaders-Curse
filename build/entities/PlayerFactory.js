"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../data/Data");
var Player_1 = require("./Player");
var PlayerFactory = /** @class */ (function () {
    function PlayerFactory() {
    }
    PlayerFactory.restoreFromSave = function (saveData) {
        switch (saveData.archetype_id) {
            case 10 /* KNIGHT */:
                return PlayerFactory.createKnight(saveData);
            case 20 /* RANGER */:
                return PlayerFactory.createRanger(saveData);
            case 30 /* MAGE */:
                return PlayerFactory.createMage(saveData);
            default:
                return null;
        }
    };
    PlayerFactory.createKnight = function (saveData) {
        return new Player_1.Player(saveData, {
            name: saveData.name,
            type: "player",
            archetype: Data_1.getArchetypeName(10 /* KNIGHT */),
            health: 125,
            healthRegen: 0.03,
            mana: 100,
            manaRegen: 0.02,
            moveSpeed: 1,
            resistance: {
                physical: 0.25,
                magical: 0.15
            },
            defense: {
                melee: 0.15,
                ranged: 0.10
            },
            abilities: {},
            damageMultiplier: 1,
            x: saveData.last_map.x,
            y: saveData.last_map.y
        });
    };
    PlayerFactory.createRanger = function (saveData) {
        return new Player_1.Player(saveData, {
            name: saveData.name,
            type: "player",
            archetype: Data_1.getArchetypeName(20 /* RANGER */),
            health: 100,
            healthRegen: 0.02,
            mana: 100,
            manaRegen: 0.02,
            moveSpeed: 1,
            resistance: {
                physical: 0.10,
                magical: 0.05
            },
            defense: {
                melee: 0.25,
                ranged: 0.15
            },
            abilities: {},
            damageMultiplier: 1,
            x: saveData.last_map.x,
            y: saveData.last_map.y
        });
    };
    PlayerFactory.createMage = function (saveData) {
        return new Player_1.Player(saveData, {
            name: saveData.name,
            type: "player",
            archetype: Data_1.getArchetypeName(30 /* MAGE */),
            health: 85,
            healthRegen: 0.02,
            mana: 100,
            manaRegen: 0.04,
            moveSpeed: 1,
            resistance: {
                physical: 0.00,
                magical: 0.20
            },
            defense: {
                melee: 0.15,
                ranged: 0.20
            },
            abilities: {},
            damageMultiplier: 1,
            x: saveData.last_map.x,
            y: saveData.last_map.y
        });
    };
    return PlayerFactory;
}());
exports.PlayerFactory = PlayerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL1BsYXllckZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBMkQ7QUFFM0QsbUNBQWtDO0FBRWxDO0lBQUE7SUF3RkEsQ0FBQztJQXZGaUIsNkJBQWUsR0FBN0IsVUFBOEIsUUFBMEI7UUFDcEQsUUFBTyxRQUFRLENBQUMsWUFBWSxFQUFDO1lBQ3pCO2dCQUNJLE9BQU8sYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRDtnQkFDSSxPQUFPLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQ7Z0JBQ0ksT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDO2dCQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVjLDBCQUFZLEdBQTNCLFVBQTRCLFFBQTBCO1FBQ2xELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUksRUFBZ0IsUUFBUSxDQUFDLElBQUk7WUFDakMsSUFBSSxFQUFnQixRQUFRO1lBQzVCLFNBQVMsRUFBVyx1QkFBZ0IsaUJBQWtCO1lBQ3RELE1BQU0sRUFBYyxHQUFHO1lBQ3ZCLFdBQVcsRUFBUyxJQUFJO1lBQ3hCLElBQUksRUFBZ0IsR0FBRztZQUN2QixTQUFTLEVBQVcsSUFBSTtZQUN4QixTQUFTLEVBQVcsQ0FBQztZQUNyQixVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFRLElBQUk7Z0JBQ3BCLE9BQU8sRUFBUyxJQUFJO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBVyxJQUFJO2dCQUNwQixNQUFNLEVBQVUsSUFBSTthQUN2QjtZQUNELFNBQVMsRUFBVyxFQUFFO1lBQ3RCLGdCQUFnQixFQUFJLENBQUM7WUFDckIsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLDBCQUFZLEdBQTNCLFVBQTRCLFFBQTBCO1FBQ2xELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUksRUFBZ0IsUUFBUSxDQUFDLElBQUk7WUFDakMsSUFBSSxFQUFnQixRQUFRO1lBQzVCLFNBQVMsRUFBVyx1QkFBZ0IsaUJBQWtCO1lBQ3RELE1BQU0sRUFBYyxHQUFHO1lBQ3ZCLFdBQVcsRUFBUyxJQUFJO1lBQ3hCLElBQUksRUFBZ0IsR0FBRztZQUN2QixTQUFTLEVBQVcsSUFBSTtZQUN4QixTQUFTLEVBQVcsQ0FBQztZQUNyQixVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFRLElBQUk7Z0JBQ3BCLE9BQU8sRUFBUyxJQUFJO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBVyxJQUFJO2dCQUNwQixNQUFNLEVBQVUsSUFBSTthQUN2QjtZQUNELFNBQVMsRUFBVyxFQUFFO1lBQ3RCLGdCQUFnQixFQUFJLENBQUM7WUFDckIsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLHdCQUFVLEdBQXpCLFVBQTBCLFFBQTBCO1FBQ2hELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUksRUFBZ0IsUUFBUSxDQUFDLElBQUk7WUFDakMsSUFBSSxFQUFnQixRQUFRO1lBQzVCLFNBQVMsRUFBVyx1QkFBZ0IsZUFBZ0I7WUFDcEQsTUFBTSxFQUFjLEVBQUU7WUFDdEIsV0FBVyxFQUFTLElBQUk7WUFDeEIsSUFBSSxFQUFnQixHQUFHO1lBQ3ZCLFNBQVMsRUFBVyxJQUFJO1lBQ3hCLFNBQVMsRUFBVyxDQUFDO1lBQ3JCLFVBQVUsRUFBRTtnQkFDUixRQUFRLEVBQVEsSUFBSTtnQkFDcEIsT0FBTyxFQUFTLElBQUk7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFXLElBQUk7Z0JBQ3BCLE1BQU0sRUFBVSxJQUFJO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFXLEVBQUU7WUFDdEIsZ0JBQWdCLEVBQUksQ0FBQztZQUNyQixDQUFDLEVBQW1CLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQW1CLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBeEZELElBd0ZDO0FBeEZZLHNDQUFhIn0=