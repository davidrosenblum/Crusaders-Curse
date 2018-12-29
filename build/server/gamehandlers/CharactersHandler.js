"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharactersHandler = /** @class */ (function () {
    function CharactersHandler(database, mapsHandler) {
        this._database = database;
        this._maps = mapsHandler;
    }
    CharactersHandler.prototype.getCharacters = function (client) {
        if (!client.hasAccountData) {
            client.send(3 /* CHARACTER_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        this._database.getCharacterList(client.accountID)
            .then(function (characterList) { return client.send(3 /* CHARACTER_LIST */, { characterList: characterList }, 2 /* GOOD */); })
            .catch(function (err) { return client.send(3 /* CHARACTER_LIST */, err.message, 4 /* BAD */); });
    };
    CharactersHandler.prototype.createCharacter = function (client, data) {
        if (!client.hasAccountData) {
            client.send(4 /* CHARACTER_CREATE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.name, name = _a === void 0 ? null : _a, _b = data.archetype, archetype = _b === void 0 ? null : _b, _c = data.skin, skin = _c === void 0 ? null : _c;
        if (!name || !archetype) {
            client.send(4 /* CHARACTER_CREATE */, "Invalid request json - missing name and/or archetype.", 4 /* BAD */);
            return;
        }
        var archetypeID = -1;
        switch (archetype.toLowerCase()) {
            case "knight":
                archetypeID = 10 /* KNIGHT */;
                break;
            case "ranger":
                archetypeID = 20 /* RANGER */;
                break;
            case "mage":
                archetypeID = 30 /* MAGE */;
                break;
        }
        if (archetypeID === -1) {
            client.send(4 /* CHARACTER_CREATE */, "Invalid request json - invalid archetype.", 4 /* BAD */);
            return;
        }
        this._database.createCharacter(client.accountID, archetypeID, name, skin)
            .then(function (message) { return client.send(4 /* CHARACTER_CREATE */, message, 2 /* GOOD */); })
            .catch(function (err) { return client.send(4 /* CHARACTER_CREATE */, err.message, 4 /* BAD */); });
    };
    CharactersHandler.prototype.selectCharacter = function (client, data) {
        var _this = this;
        if (!client.hasAccountData) {
            client.send(6 /* CHARACTER_SELECT */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        if (client.player) {
            client.send(6 /* CHARACTER_SELECT */, "Player already selected.", 4 /* BAD */);
            return;
        }
        var name = data.name;
        client.setSelectedName(name);
        this._database.getCharacter(client.accountID, client.selectedName)
            .then(function (saveData) {
            var mapID = saveData.last_map.map_id;
            _this._maps.enterMap(client, { mapID: mapID });
        })
            .catch(function (err) {
            client.setSelectedName(null);
            client.send(6 /* CHARACTER_SELECT */, err.message, 4 /* BAD */);
        });
    };
    return CharactersHandler;
}());
exports.CharactersHandler = CharactersHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZWhhbmRsZXJzL0NoYXJhY3RlcnNIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUE7SUFJSSwyQkFBWSxRQUFxQixFQUFFLFdBQXVCO1FBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBQzdCLENBQUM7SUFFTSx5Q0FBYSxHQUFwQixVQUFxQixNQUFpQjtRQUNsQyxJQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQztZQUN0QixNQUFNLENBQUMsSUFBSSx5QkFBd0IsMkJBQTJCLGNBQWEsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDNUMsSUFBSSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUkseUJBQXdCLEVBQUMsYUFBYSxlQUFBLEVBQUMsZUFBYyxFQUFoRSxDQUFnRSxDQUFDO2FBQ3ZGLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLHlCQUF3QixHQUFHLENBQUMsT0FBTyxjQUFhLEVBQTNELENBQTJELENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBRU0sMkNBQWUsR0FBdEIsVUFBdUIsTUFBaUIsRUFBRSxJQUFRO1FBQzlDLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLDJCQUEwQiwyQkFBMkIsY0FBYSxDQUFDO1lBQzlFLE9BQU87U0FDVjtRQUVJLElBQUEsY0FBUyxFQUFULGdDQUFTLEVBQUUsbUJBQWMsRUFBZCxxQ0FBYyxFQUFFLGNBQVMsRUFBVCxnQ0FBUyxDQUFTO1FBRWxELElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksMkJBQTBCLHVEQUF1RCxjQUFhLENBQUM7WUFDMUcsT0FBTztTQUNWO1FBRUQsSUFBSSxXQUFXLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsUUFBTyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUM7WUFDM0IsS0FBSyxRQUFRO2dCQUNULFdBQVcsa0JBQW1CLENBQUM7Z0JBQy9CLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsV0FBVyxrQkFBbUIsQ0FBQztnQkFDL0IsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxXQUFXLGdCQUFpQixDQUFDO2dCQUM3QixNQUFNO1NBQ2I7UUFFRCxJQUFHLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBQztZQUNsQixNQUFNLENBQUMsSUFBSSwyQkFBMEIsMkNBQTJDLGNBQWEsQ0FBQztZQUM5RixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3BFLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLDJCQUEwQixPQUFPLGVBQWMsRUFBMUQsQ0FBMEQsQ0FBQzthQUMzRSxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSwyQkFBMEIsR0FBRyxDQUFDLE9BQU8sY0FBYSxFQUE3RCxDQUE2RCxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLDJDQUFlLEdBQXRCLFVBQXVCLE1BQWlCLEVBQUUsSUFBUTtRQUFsRCxpQkF1QkM7UUF0QkcsSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksMkJBQTBCLDJCQUEyQixjQUFhLENBQUM7WUFDOUUsT0FBTztTQUNWO1FBRUQsSUFBRyxNQUFNLENBQUMsTUFBTSxFQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksMkJBQTBCLDBCQUEwQixjQUFhLENBQUM7WUFDN0UsT0FBTztTQUNWO1FBRUksSUFBQSxnQkFBSSxDQUFTO1FBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzdELElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDVixJQUFJLEtBQUssR0FBVSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM1QyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNOLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksMkJBQTBCLEdBQUcsQ0FBQyxPQUFPLGNBQWEsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFoRkQsSUFnRkM7QUFoRlksOENBQWlCIn0=