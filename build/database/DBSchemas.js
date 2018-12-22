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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJTY2hlbWFzLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvREJTY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNENBLFNBQWdCLHNCQUFzQixDQUFDLFNBQWdCLEVBQUUsV0FBa0IsRUFBRSxJQUFXLEVBQUUsSUFBYTtJQUFiLHFCQUFBLEVBQUEsUUFBYTtJQUNuRyxPQUFPO1FBQ0gsVUFBVSxFQUFFLFNBQVM7UUFDckIsSUFBSSxNQUFBO1FBQ0osS0FBSyxFQUFPLENBQUM7UUFDYixFQUFFLEVBQVUsQ0FBQztRQUNiLElBQUksRUFBUSxDQUFDO1FBQ2IsT0FBTyxFQUFLO1lBQ1IsTUFBTSxFQUFNLENBQUM7WUFDYixJQUFJLEVBQVEsQ0FBQztZQUNiLElBQUksRUFBUSxDQUFDO1lBQ2IsSUFBSSxFQUFRLENBQUM7WUFDYixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNOLE1BQU0sRUFBRSxDQUFDO1lBQ1QsQ0FBQyxFQUFPLENBQUMsQ0FBQztZQUNWLENBQUMsRUFBTyxDQUFDLENBQUM7U0FDYjtRQUNELFNBQVMsRUFBRSxFQUFFO1FBQ2IsWUFBWSxFQUFFLFdBQVc7UUFDekIsSUFBSSxNQUFBO0tBQ1AsQ0FBQztBQUNOLENBQUM7QUF2QkQsd0RBdUJDIn0=