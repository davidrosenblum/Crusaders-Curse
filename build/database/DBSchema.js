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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJTY2hlbWEuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJkYXRhYmFzZS9EQlNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTRDQSxTQUFnQixzQkFBc0IsQ0FBQyxTQUFnQixFQUFFLFdBQWtCLEVBQUUsSUFBVyxFQUFFLElBQWE7SUFBYixxQkFBQSxFQUFBLFFBQWE7SUFDbkcsT0FBTztRQUNILFVBQVUsRUFBRSxTQUFTO1FBQ3JCLElBQUksTUFBQTtRQUNKLEtBQUssRUFBTyxDQUFDO1FBQ2IsRUFBRSxFQUFVLENBQUM7UUFDYixJQUFJLEVBQVEsQ0FBQztRQUNiLE9BQU8sRUFBSztZQUNSLE1BQU0sRUFBTSxDQUFDO1lBQ2IsSUFBSSxFQUFRLENBQUM7WUFDYixJQUFJLEVBQVEsQ0FBQztZQUNiLElBQUksRUFBUSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7U0FDaEI7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsQ0FBQztZQUNULENBQUMsRUFBTyxDQUFDLENBQUM7WUFDVixDQUFDLEVBQU8sQ0FBQyxDQUFDO1NBQ2I7UUFDRCxTQUFTLEVBQUUsRUFBRTtRQUNiLFlBQVksRUFBRSxXQUFXO1FBQ3pCLElBQUksTUFBQTtLQUNQLENBQUM7QUFDTixDQUFDO0FBdkJELHdEQXVCQyJ9