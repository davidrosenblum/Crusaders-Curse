"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var CharactersHandler = /** @class */ (function (_super) {
    __extends(CharactersHandler, _super);
    function CharactersHandler(database) {
        var _this = _super.call(this) || this;
        _this._database = database;
        return _this;
    }
    CharactersHandler.prototype.listCharacters = function (client) {
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
        client.setPlayerName(name);
        this.loadPlayer(client)
            .then(function (saveData) {
            var mapID = saveData.last_map.map_id;
            _this.processMapEnter(client, { mapID: mapID });
        })
            .catch(function (err) {
            client.setPlayerName(null);
            client.send(6 /* CHARACTER_SELECT */, err.message, 4 /* BAD */);
        });
    };
    return CharactersHandler;
}(events_1.EventEmitter));
exports.CharactersHandler = CharactersHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZS9DaGFyYWN0ZXJzSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBc0M7QUFLdEM7SUFBdUMscUNBQVk7SUFHL0MsMkJBQVksUUFBcUI7UUFBakMsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7O0lBQzlCLENBQUM7SUFFTSwwQ0FBYyxHQUFyQixVQUFzQixNQUFpQjtRQUNuQyxJQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQztZQUN0QixNQUFNLENBQUMsSUFBSSx5QkFBd0IsMkJBQTJCLGNBQWEsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDNUMsSUFBSSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUkseUJBQXdCLEVBQUMsYUFBYSxlQUFBLEVBQUMsZUFBYyxFQUFoRSxDQUFnRSxDQUFDO2FBQ3ZGLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLHlCQUF3QixHQUFHLENBQUMsT0FBTyxjQUFhLEVBQTNELENBQTJELENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBRU0sMkNBQWUsR0FBdEIsVUFBdUIsTUFBaUIsRUFBRSxJQUFRO1FBQzlDLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLDJCQUEwQiwyQkFBMkIsY0FBYSxDQUFDO1lBQzlFLE9BQU87U0FDVjtRQUVJLElBQUEsY0FBUyxFQUFULGdDQUFTLEVBQUUsbUJBQWMsRUFBZCxxQ0FBYyxFQUFFLGNBQVMsRUFBVCxnQ0FBUyxDQUFTO1FBRWxELElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksMkJBQTBCLHVEQUF1RCxjQUFhLENBQUM7WUFDMUcsT0FBTztTQUNWO1FBRUQsSUFBSSxXQUFXLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsUUFBTyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUM7WUFDM0IsS0FBSyxRQUFRO2dCQUNULFdBQVcsa0JBQW1CLENBQUM7Z0JBQy9CLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsV0FBVyxrQkFBbUIsQ0FBQztnQkFDL0IsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxXQUFXLGdCQUFpQixDQUFDO2dCQUM3QixNQUFNO1NBQ2I7UUFFRCxJQUFHLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBQztZQUNsQixNQUFNLENBQUMsSUFBSSwyQkFBMEIsMkNBQTJDLGNBQWEsQ0FBQztZQUM5RixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3BFLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLDJCQUEwQixPQUFPLGVBQWMsRUFBMUQsQ0FBMEQsQ0FBQzthQUMzRSxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSwyQkFBMEIsR0FBRyxDQUFDLE9BQU8sY0FBYSxFQUE3RCxDQUE2RCxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLDJDQUFlLEdBQXRCLFVBQXVCLE1BQWlCLEVBQUUsSUFBUTtRQUFsRCxpQkF3QkM7UUF2QkcsSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksMkJBQTBCLDJCQUEyQixjQUFhLENBQUM7WUFDOUUsT0FBTztTQUNWO1FBRUQsSUFBRyxNQUFNLENBQUMsTUFBTSxFQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksMkJBQTBCLDBCQUEwQixjQUFhLENBQUM7WUFDN0UsT0FBTztTQUNWO1FBRUksSUFBQSxnQkFBSSxDQUFTO1FBRWxCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDbEIsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNWLElBQUksS0FBSyxHQUFVLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzVDLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDTixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLDJCQUEwQixHQUFHLENBQUMsT0FBTyxjQUFhLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBakZELENBQXVDLHFCQUFZLEdBaUZsRDtBQWpGWSw4Q0FBaUIifQ==