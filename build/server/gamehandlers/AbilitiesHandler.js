"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbilitiesHandler = /** @class */ (function () {
    function AbilitiesHandler() {
    }
    AbilitiesHandler.prototype.getAbilities = function (client) {
        if (!client.player) {
            client.send(16 /* ABILITY_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var abilities = client.player.getAbilities();
        client.send(16 /* ABILITY_LIST */, { abilities: abilities }, 2 /* GOOD */);
    };
    return AbilitiesHandler;
}());
exports.AbilitiesHandler = AbilitiesHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJpbGl0aWVzSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9nYW1laGFuZGxlcnMvQWJpbGl0aWVzSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7SUFXQSxDQUFDO0lBVlUsdUNBQVksR0FBbkIsVUFBb0IsTUFBaUI7UUFDakMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUM7WUFDZCxNQUFNLENBQUMsSUFBSSx3QkFBc0IsMkJBQTJCLGNBQWEsQ0FBQztZQUMxRSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFNBQVMsR0FBbUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RSxNQUFNLENBQUMsSUFBSSx3QkFBc0IsRUFBQyxTQUFTLFdBQUEsRUFBQyxlQUFjLENBQUM7SUFDL0QsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSw0Q0FBZ0IifQ==