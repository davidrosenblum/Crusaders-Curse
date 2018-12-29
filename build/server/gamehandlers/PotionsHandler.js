"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PotionsHandler = /** @class */ (function () {
    function PotionsHandler() {
    }
    PotionsHandler.prototype.getPotions = function (client) {
        if (!client.player) {
            client.send(19 /* POTION_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var potions = client.player.getPotions();
        client.send(19 /* POTION_LIST */, { potions: potions }, 2 /* GOOD */);
    };
    return PotionsHandler;
}());
exports.PotionsHandler = PotionsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG90aW9uc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZWhhbmRsZXJzL1BvdGlvbnNIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtJQVdBLENBQUM7SUFWVSxtQ0FBVSxHQUFqQixVQUFrQixNQUFpQjtRQUMvQixJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLHVCQUFxQiwyQkFBMkIsY0FBYSxDQUFDO1lBQ3pFLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFakQsTUFBTSxDQUFDLElBQUksdUJBQXFCLEVBQUMsT0FBTyxTQUFBLEVBQUMsZUFBYyxDQUFDO0lBQzVELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksd0NBQWMifQ==