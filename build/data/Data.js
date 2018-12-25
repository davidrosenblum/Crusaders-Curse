"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapData_1 = require("./MapData");
;
function getArchetypeName(id) {
    switch (id) {
        case 10 /* KNIGHT */:
            return "Knight";
        case 11 /* CRUSADER */:
            return "Crusader";
        case 12 /* TEMPLAR */:
            return "Templar";
        case 20 /* RANGER */:
            return "Ranger";
        case 21 /* ASASSIN */:
            return "Assassin";
        case 22 /* SENTINEL */:
            return "Sentinel";
        case 30 /* MAGE */:
            return "Mage";
        case 31 /* ARCANE_ENCHANTER */:
            return "Arcane Enchanter";
        case 32 /* BLOOD_MAGE */:
            return "Blood Mage";
        default:
            return "NOT_FOUND";
    }
}
exports.getArchetypeName = getArchetypeName;
;
exports.getMapName = function (id) {
    switch (id) {
        case 1 /* CITY_OF_KINGS */:
            return "City of Kings";
        case 2 /* HINTERLANDS */:
            return "Hinterlands";
        case 3 /* NORTHERN_RUINS */:
            return "Northern Ruins";
        case 4 /* DESERT_OASIS */:
            return "Desert Oasis";
        case 5 /* VOLCANIC_WASTELANDS */:
            return "Volcanic Wastelands";
        case 6 /* THE_SCHISM */:
            return "The Schism";
        default:
            return "NOT_FOUND";
    }
};
exports.getMapData = function (id) {
    return MapData_1.MAP_DATA[id] || null;
};
exports.getInstanceName = function (id) {
    switch (id) {
        case 1 /* RAIDER_ENCAMPMENT */:
            return "Raider Encampment";
        case 2 /* ORC_STRONGHOLD */:
            return "Orc Stronghold";
        case 3 /* ANCIENT_CATACOMBS */:
            return "Ancient Catacombs";
        case 4 /* FORBIDDEN_RUINS */:
            return "Forbidden Ruins";
        case 5 /* DESERTERS_BASTION */:
            return "Deserters Bastion";
        case 6 /* OASIS_CATHEDRAL */:
            return "Oasis Cathedral";
        case 7 /* HELL_FORGE */:
            return "Hell Forge";
        case 8 /* DEEP_MINES */:
            return "Hell Forge";
        default:
            return "NOT_FOUND";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImRhdGEvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQVlwQyxDQUFDO0FBRUYsU0FBZ0IsZ0JBQWdCLENBQUMsRUFBUztJQUN0QyxRQUFPLEVBQUUsRUFBQztRQUNOO1lBQ0ksT0FBTyxRQUFRLENBQUM7UUFDcEI7WUFDSSxPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCO1lBQ0ksT0FBTyxRQUFRLENBQUM7UUFDcEI7WUFDSSxPQUFPLFVBQVUsQ0FBQztRQUN0QjtZQUNJLE9BQU8sVUFBVSxDQUFDO1FBQ3RCO1lBQ0ksT0FBTyxNQUFNLENBQUM7UUFDbEI7WUFDSSxPQUFPLGtCQUFrQixDQUFDO1FBQzlCO1lBQ0ksT0FBTyxZQUFZLENBQUM7UUFDeEI7WUFDSSxPQUFPLFdBQVcsQ0FBQztLQUMxQjtBQUNMLENBQUM7QUF2QkQsNENBdUJDO0FBU0EsQ0FBQztBQUVXLFFBQUEsVUFBVSxHQUFHLFVBQVMsRUFBUztJQUN4QyxRQUFPLEVBQUUsRUFBQztRQUNOO1lBQ0ksT0FBTyxlQUFlLENBQUM7UUFDM0I7WUFDSSxPQUFPLGFBQWEsQ0FBQztRQUN6QjtZQUNJLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUI7WUFDSSxPQUFPLGNBQWMsQ0FBQztRQUMxQjtZQUNJLE9BQU8scUJBQXFCLENBQUM7UUFDakM7WUFDSSxPQUFPLFlBQVksQ0FBQztRQUN4QjtZQUNJLE9BQU8sV0FBVyxDQUFDO0tBQzFCO0FBQ0wsQ0FBQyxDQUFBO0FBU1ksUUFBQSxVQUFVLEdBQUcsVUFBUyxFQUFTO0lBQ3hDLE9BQU8sa0JBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDaEMsQ0FBQyxDQUFBO0FBYVksUUFBQSxlQUFlLEdBQUcsVUFBUyxFQUFTO0lBQzdDLFFBQU8sRUFBRSxFQUFDO1FBQ047WUFDSSxPQUFPLG1CQUFtQixDQUFDO1FBQy9CO1lBQ0ksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QjtZQUNJLE9BQU8sbUJBQW1CLENBQUM7UUFDL0I7WUFDSSxPQUFPLGlCQUFpQixDQUFDO1FBQzdCO1lBQ0ksT0FBTyxtQkFBbUIsQ0FBQztRQUMvQjtZQUNJLE9BQU8saUJBQWlCLENBQUM7UUFDN0I7WUFDSSxPQUFPLFlBQVksQ0FBQztRQUN4QjtZQUNJLE9BQU8sWUFBWSxDQUFDO1FBQ3hCO1lBQ0ksT0FBTyxXQUFXLENBQUM7S0FDMUI7QUFDTCxDQUFDLENBQUEifQ==