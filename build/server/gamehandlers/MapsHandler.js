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
                client.player = PlayerFactory_1.PlayerFactory.restoreFromSave(saveData, client.clientID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwc0hhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZWhhbmRsZXJzL01hcHNIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsNERBQTJEO0FBRzNELDhEQUE2RDtBQU03RDtJQU1JLHFCQUFZLFFBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsK0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxnQ0FBVSxHQUFsQixVQUFtQixNQUFpQjtRQUFwQyxpQkFTQztRQVJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQzdELElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1YsTUFBTSxDQUFDLE1BQU0sR0FBRyw2QkFBYSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw4QkFBUSxHQUFmLFVBQWdCLE1BQWlCLEVBQUUsSUFBUTtRQUEzQyxpQkFvQ0M7UUFuQ0csSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFDO1lB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