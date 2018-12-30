"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbilitiesHandler = /** @class */ (function () {
    function AbilitiesHandler() {
    }
    AbilitiesHandler.prototype.getAbilities = function (client) {
        if (!client.player) {
            client.send(16 /* ABILITY_LIST */, "No current player.", 4 /* BAD */);
            return;
        }
        var abilities = client.player.getAbilities();
        client.send(16 /* ABILITY_LIST */, { abilities: abilities }, 2 /* GOOD */);
    };
    AbilitiesHandler.prototype.castAbility = function (client, data) {
        if (!client.player || !client.player.map) {
            client.send(17 /* ABILITY_CAST */, "No current player in a map.", 4 /* BAD */);
            return;
        }
        var _a = data.objectID, objectID = _a === void 0 ? null : _a, _b = data.abilityName, abilityName = _b === void 0 ? null : _b;
        if (!objectID || !abilityName) {
            client.send(17 /* ABILITY_CAST */, "Invalid request json - missing target's objectID or abilityName.", 4 /* BAD */);
            return;
        }
        try {
            client.player.map.unitCastAbility(client.player.objectID, abilityName, objectID);
        }
        catch (err) {
            client.send(17 /* ABILITY_CAST */, err.message, 4 /* BAD */);
            return;
        }
        client.send(17 /* ABILITY_CAST */, "Ability casted.", 2 /* GOOD */);
    };
    AbilitiesHandler.prototype.purchaseAbility = function (client, data) {
    };
    return AbilitiesHandler;
}());
exports.AbilitiesHandler = AbilitiesHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJpbGl0aWVzSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9nYW1laGFuZGxlcnMvQWJpbGl0aWVzSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7SUFzQ0EsQ0FBQztJQXJDVSx1Q0FBWSxHQUFuQixVQUFvQixNQUFpQjtRQUNqQyxJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLHdCQUFzQixvQkFBb0IsY0FBYSxDQUFDO1lBQ25FLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFtQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTdFLE1BQU0sQ0FBQyxJQUFJLHdCQUFzQixFQUFDLFNBQVMsV0FBQSxFQUFDLGVBQWMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sc0NBQVcsR0FBbEIsVUFBbUIsTUFBaUIsRUFBRSxJQUFRO1FBQzFDLElBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksd0JBQXNCLDZCQUE2QixjQUFhLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBRUksSUFBQSxrQkFBYSxFQUFiLG9DQUFhLEVBQUUscUJBQWdCLEVBQWhCLHVDQUFnQixDQUFTO1FBQzdDLElBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksd0JBQXNCLGtFQUFrRSxjQUFhLENBQUM7WUFDakgsT0FBTztTQUNWO1FBRUQsSUFBRztZQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEY7UUFDRCxPQUFNLEdBQUcsRUFBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLHdCQUFzQixHQUFHLENBQUMsT0FBTyxjQUFhLENBQUM7WUFDMUQsT0FBTztTQUNWO1FBRUQsTUFBTSxDQUFDLElBQUksd0JBQXNCLGlCQUFpQixlQUFjLENBQUM7SUFDckUsQ0FBQztJQUVNLDBDQUFlLEdBQXRCLFVBQXVCLE1BQWlCLEVBQUUsSUFBUTtJQUVsRCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBdENZLDRDQUFnQiJ9