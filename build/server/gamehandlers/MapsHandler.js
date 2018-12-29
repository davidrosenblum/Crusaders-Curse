"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMapFactory_1 = require("../../maps/GameMapFactory");
var PlayerFactory_1 = require("../../entities/PlayerFactory");
var MapsHandler = /** @class */ (function () {
    function MapsHandler(database) {
        this._database = database;
        this._maps = GameMapFactory_1.GameMapFactory.createDefaultMaps();
        this._instances = {};
        this._numInstances = 0;
    }
    MapsHandler.prototype.loadPlayer = function (client) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.getCharacter(client.accountID, client.selectedName)
                .then(function (saveData) {
                client.player = PlayerFactory_1.PlayerFactory.restoreFromSave(saveData);
                resolve(saveData);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    MapsHandler.prototype.enterMap = function (client, data) {
        var _this = this;
        if (!client.hasAccountData || !client.selectedName) {
            client.send(7 /* ENTER_MAP */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.mapID, mapID = _a === void 0 ? null : _a;
        if (!mapID) {
            client.send(7 /* ENTER_MAP */, "Invalid request json - missing map ID.");
            return;
        }
        var map = this._maps[mapID] || null;
        if (!map) {
            client.send(7 /* ENTER_MAP */, "Invalid map ID.");
            return;
        }
        // if player has been loaded (not first map join after log in) & player is switching maps 
        if (client.player && client.player.map) {
            client.player.map.removeClient(client);
        }
        try {
            // sends the map join packet
            map.addClient(client, function (done) {
                // reload the player
                _this.loadPlayer(client)
                    .then(function () { return done(); })
                    .catch(function (err) { return client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */); });
            });
        }
        catch (err) {
            client.send(7 /* ENTER_MAP */, err.message, 4 /* BAD */);
        }
    };
    MapsHandler.prototype.enterInstance = function (client, data) {
        var _this = this;
        if (!client.hasAccountData || !client.selectedName) {
            client.send(8 /* ENTER_INSTANCE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.instanceID, instanceID = _a === void 0 ? null : _a, _b = data.instanceType, instanceType = _b === void 0 ? null : _b;
        if (!instanceID && !instanceType) {
            client.send(8 /* ENTER_INSTANCE */, "Invalid request json - missing instance ID or new instance type.");
            return;
        }
        var instance = null;
        if (instanceID) {
            instance = this._instances[instanceID] || null;
        }
        else if (instanceType) {
            try {
                instance = GameMapFactory_1.GameMapFactory.createInstance(instanceType);
                instance.on("empty", function () {
                    delete _this._instances[instance.instanceID];
                    _this._numInstances--;
                });
            }
            catch (err) {
                client.send(8 /* ENTER_INSTANCE */, "Unable to create instance: " + err.message, 4 /* BAD */);
                return;
            }
        }
        if (!instance) {
            client.send(8 /* ENTER_INSTANCE */, "Instance not found.", 4 /* BAD */);
            return;
        }
        try {
            // sends the map join packet
            instance.addClient(client, function (done) {
                // reload the player
                _this.loadPlayer(client)
                    .then(function () { return done(); })
                    .catch(function (err) { return client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */); });
            });
        }
        catch (err) {
            client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */);
        }
    };
    MapsHandler.prototype.updateUnit = function (client, data) {
        if (!client.player || !client.player.map) {
            client.send(14 /* OBJECT_STATS */, "Not in a room with a player.", 4 /* BAD */);
            return;
        }
        var _a = data.objectID, objectID = _a === void 0 ? -1 : _a, _b = data.x, x = _b === void 0 ? undefined : _b, _c = data.y, y = _c === void 0 ? undefined : _c, _d = data.anim, anim = _d === void 0 ? undefined : _d;
        var update = { objectID: objectID, x: x, y: y, anim: anim };
        client.player.map.updateUnit(update); // sends the update 
    };
    MapsHandler.prototype.getUnitStats = function (client, data) {
        if (!client.player || !client.player.map) {
            client.send(14 /* OBJECT_STATS */, "Not in a room with a player.", 4 /* BAD */);
            return;
        }
        var _a = data.objectID, objectID = _a === void 0 ? null : _a;
        if (!objectID) {
            client.send(14 /* OBJECT_STATS */, "Invalid json request - missing objectID.", 4 /* BAD */);
            return;
        }
        var map = client.player.map;
        if (map) {
            var stats = client.player.map.getUnitStats(objectID);
            if (stats) {
                client.send(14 /* OBJECT_STATS */, stats, 2 /* GOOD */);
            }
            else {
                client.send(14 /* OBJECT_STATS */, "Invalid target ID.", 4 /* BAD */);
            }
        }
        else {
            client.send(14 /* OBJECT_STATS */, "You are not in a map.", 4 /* BAD */);
        }
    };
    Object.defineProperty(MapsHandler.prototype, "numInstances", {
        get: function () {
            return this._numInstances;
        },
        enumerable: true,
        configurable: true
    });
    return MapsHandler;
}());
exports.MapsHandler = MapsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZWhhbmRsZXJzL01hcHNIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsNERBQTJEO0FBRzNELDhEQUE2RDtBQU03RDtJQU1JLHFCQUFZLFFBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsK0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxnQ0FBVSxHQUFsQixVQUFtQixNQUFpQjtRQUFwQyxpQkFTQztRQVJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQzdELElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1YsTUFBTSxDQUFDLE1BQU0sR0FBRyw2QkFBYSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixNQUFpQixFQUFFLElBQVE7UUFBM0MsaUJBb0NDO1FBbkNHLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQztZQUM5QyxNQUFNLENBQUMsSUFBSSxv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