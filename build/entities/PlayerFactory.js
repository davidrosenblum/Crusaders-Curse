"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../data/Data");
var Player_1 = require("./Player");
var PlayerFactory = /** @class */ (function () {
    function PlayerFactory() {
    }
    PlayerFactory.restoreFromSave = function (saveData, ownerID) {
        switch (saveData.archetype_id) {
            case 10 /* KNIGHT */:
                return PlayerFactory.createKnight(saveData, ownerID);
            case 20 /* RANGER */:
                return PlayerFactory.createRanger(saveData, ownerID);
            case 30 /* MAGE */:
                return PlayerFactory.createMage(saveData, ownerID);
            default:
                return null;
        }
    };
    PlayerFactory.createKnight = function (saveData, ownerID) {
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
            y: saveData.last_map.y,
            team: "King's Legion" /* KINGS_LEGION */,
            ownerID: ownerID
        });
    };
    PlayerFactory.createRanger = function (saveData, ownerID) {
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
            y: saveData.last_map.y,
            team: "King's Legion" /* KINGS_LEGION */,
            ownerID: ownerID
        });
    };
    PlayerFactory.createMage = function (saveData, ownerID) {
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
            y: saveData.last_map.y,
            team: "King's Legion" /* KINGS_LEGION */,
            ownerID: ownerID
        });
    };
    return PlayerFactory;
}());
exports.PlayerFactory = PlayerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL1BsYXllckZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBaUU7QUFFakUsbUNBQWtDO0FBRWxDO0lBQUE7SUE4RkEsQ0FBQztJQTdGaUIsNkJBQWUsR0FBN0IsVUFBOEIsUUFBMEIsRUFBRSxPQUFjO1FBQ3BFLFFBQU8sUUFBUSxDQUFDLFlBQVksRUFBQztZQUN6QjtnQkFDSSxPQUFPLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pEO2dCQUNJLE9BQU8sYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekQ7Z0JBQ0ksT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2RDtnQkFDSSxPQUFPLElBQUksQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFYywwQkFBWSxHQUEzQixVQUE0QixRQUEwQixFQUFFLE9BQWM7UUFDbEUsT0FBTyxJQUFJLGVBQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxFQUFnQixRQUFRLENBQUMsSUFBSTtZQUNqQyxJQUFJLEVBQWdCLFFBQVE7WUFDNUIsU0FBUyxFQUFXLHVCQUFnQixpQkFBa0I7WUFDdEQsTUFBTSxFQUFjLEdBQUc7WUFDdkIsV0FBVyxFQUFTLElBQUk7WUFDeEIsSUFBSSxFQUFnQixHQUFHO1lBQ3ZCLFNBQVMsRUFBVyxJQUFJO1lBQ3hCLFNBQVMsRUFBVyxDQUFDO1lBQ3JCLFVBQVUsRUFBRTtnQkFDUixRQUFRLEVBQVEsSUFBSTtnQkFDcEIsT0FBTyxFQUFTLElBQUk7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFXLElBQUk7Z0JBQ3BCLE1BQU0sRUFBVSxJQUFJO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFXLEVBQUU7WUFDdEIsZ0JBQWdCLEVBQUksQ0FBQztZQUNyQixDQUFDLEVBQW1CLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQW1CLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLG9DQUFpQztZQUNyQyxPQUFPLFNBQUE7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWMsMEJBQVksR0FBM0IsVUFBNEIsUUFBMEIsRUFBRSxPQUFjO1FBQ2xFLE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUksRUFBZ0IsUUFBUSxDQUFDLElBQUk7WUFDakMsSUFBSSxFQUFnQixRQUFRO1lBQzVCLFNBQVMsRUFBVyx1QkFBZ0IsaUJBQWtCO1lBQ3RELE1BQU0sRUFBYyxHQUFHO1lBQ3ZCLFdBQVcsRUFBUyxJQUFJO1lBQ3hCLElBQUksRUFBZ0IsR0FBRztZQUN2QixTQUFTLEVBQVcsSUFBSTtZQUN4QixTQUFTLEVBQVcsQ0FBQztZQUNyQixVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFRLElBQUk7Z0JBQ3BCLE9BQU8sRUFBUyxJQUFJO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBVyxJQUFJO2dCQUNwQixNQUFNLEVBQVUsSUFBSTthQUN2QjtZQUNELFNBQVMsRUFBVyxFQUFFO1lBQ3RCLGdCQUFnQixFQUFJLENBQUM7WUFDckIsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxvQ0FBaUM7WUFDckMsT0FBTyxTQUFBO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLHdCQUFVLEdBQXpCLFVBQTBCLFFBQTBCLEVBQUUsT0FBYztRQUNoRSxPQUFPLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLEVBQWdCLFFBQVEsQ0FBQyxJQUFJO1lBQ2pDLElBQUksRUFBZ0IsUUFBUTtZQUM1QixTQUFTLEVBQVcsdUJBQWdCLGVBQWdCO1lBQ3BELE1BQU0sRUFBYyxFQUFFO1lBQ3RCLFdBQVcsRUFBUyxJQUFJO1lBQ3hCLElBQUksRUFBZ0IsR0FBRztZQUN2QixTQUFTLEVBQVcsSUFBSTtZQUN4QixTQUFTLEVBQVcsQ0FBQztZQUNyQixVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFRLElBQUk7Z0JBQ3BCLE9BQU8sRUFBUyxJQUFJO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBVyxJQUFJO2dCQUNwQixNQUFNLEVBQVUsSUFBSTthQUN2QjtZQUNELFNBQVMsRUFBVyxFQUFFO1lBQ3RCLGdCQUFnQixFQUFJLENBQUM7WUFDckIsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxvQ0FBaUM7WUFDckMsT0FBTyxTQUFBO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQTlGRCxJQThGQztBQTlGWSxzQ0FBYSJ9