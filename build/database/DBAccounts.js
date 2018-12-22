"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createDefaultCharacter(accountID, archetypeID, name, skin) {
    if (skin === void 0) { skin = 1; }
    return {
        account_id: accountID,
        name: name,
        level: 1,
        xp: 0,
        gold: 0,
        potions: {
            health: 0,
            mana: 0,
            rage: 0,
            luck: 0,
            protection: 0
        },
        last_map: {
            map_id: 1,
            x: -1,
            y: -1
        },
        abilities: {},
        archetype_id: archetypeID,
        skin: skin
    };
}
exports.createDefaultCharacter = createDefaultCharacter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJBY2NvdW50cy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImRhdGFiYXNlL0RCQWNjb3VudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE0Q0EsU0FBZ0Isc0JBQXNCLENBQUMsU0FBZ0IsRUFBRSxXQUFrQixFQUFFLElBQVcsRUFBRSxJQUFhO0lBQWIscUJBQUEsRUFBQSxRQUFhO0lBQ25HLE9BQU87UUFDSCxVQUFVLEVBQUUsU0FBUztRQUNyQixJQUFJLE1BQUE7UUFDSixLQUFLLEVBQU8sQ0FBQztRQUNiLEVBQUUsRUFBVSxDQUFDO1FBQ2IsSUFBSSxFQUFRLENBQUM7UUFDYixPQUFPLEVBQUs7WUFDUixNQUFNLEVBQU0sQ0FBQztZQUNiLElBQUksRUFBUSxDQUFDO1lBQ2IsSUFBSSxFQUFRLENBQUM7WUFDYixJQUFJLEVBQVEsQ0FBQztZQUNiLFVBQVUsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sTUFBTSxFQUFFLENBQUM7WUFDVCxDQUFDLEVBQU8sQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFPLENBQUMsQ0FBQztTQUNiO1FBQ0QsU0FBUyxFQUFFLEVBQUU7UUFDYixZQUFZLEVBQUUsV0FBVztRQUN6QixJQUFJLE1BQUE7S0FDUCxDQUFDO0FBQ04sQ0FBQztBQXZCRCx3REF1QkMifQ==