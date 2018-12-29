"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PotionsHandler = /** @class */ (function () {
    function PotionsHandler() {
    }
    PotionsHandler.prototype.listPotions = function (client) {
        if (!client.player) {
            client.send(19 /* POTION_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        client.send(19 /* POTION_LIST */, {}, 2 /* GOOD */);
    };
    return PotionsHandler;
}());
exports.PotionsHandler = PotionsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG90aW9uc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZS9Qb3Rpb25zSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBQUE7SUFTQSxDQUFDO0lBUlUsb0NBQVcsR0FBbEIsVUFBbUIsTUFBaUI7UUFDaEMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUM7WUFDZCxNQUFNLENBQUMsSUFBSSx1QkFBcUIsMkJBQTJCLGNBQWEsQ0FBQztZQUN6RSxPQUFPO1NBQ1Y7UUFFRCxNQUFNLENBQUMsSUFBSSx1QkFBcUIsRUFBRSxlQUFjLENBQUM7SUFDckQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSx3Q0FBYyJ9