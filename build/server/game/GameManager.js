"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
var PlayerFactory_1 = require("../../entities/PlayerFactory");
var GameMapFactory_1 = require("../../maps/GameMapFactory");
var GameManager = /** @class */ (function () {
    function GameManager(database) {
        this._database = database;
        this._accounts = {};
        this._clients = {};
        this._numClients = 0;
        this._maps = GameMapFactory_1.GameMapFactory.createDefaultMaps();
        this._instances = {};
    }
    GameManager.prototype.createClient = function (conn) {
        var _this = this;
        var client = new GameClient_1.GameClient(conn);
        console.log("Client-" + client.clientID + " connected.");
        conn.on("message", function (data) {
            console.log(data.utf8Data);
            GameClient_1.GameClient.parseRequests(client, data, _this.handlClientRequest.bind(_this));
        });
        conn.on("error", function (err) {
            // handle? 
            console.log(err.message);
        });
        conn.on("close", function () { return _this.removeClient(client); });
    };
    GameManager.prototype.removeClient = function (client) {
        if (delete this._clients[client.clientID]) {
            this._numClients--;
            if (client.hasAccountData) {
                delete this._accounts[client.username];
            }
        }
    };
    GameManager.prototype.handlClientRequest = function (req) {
        var client = req.client, opCode = req.opCode, data = req.data;
        switch (opCode) {
            case 1 /* ACCOUNT_LOGIN */:
                this.processLogin(client, data);
                break;
            case 2 /* ACCOUNT_LOGOUT */:
                this.processLogout(client);
                break;
            case 3 /* CHARACTER_LIST */:
                this.processCharacterList(client);
                break;
            case 4 /* CHARACTER_CREATE */:
                this.processCharacterCreate(client, data);
                break;
            case 6 /* CHARACTER_SELECT */:
                this.processCharacterSelect(client, data);
                break;
            case 7 /* ENTER_MAP */:
                this.processMapEnter(client, data);
                break;
            case 8 /* ENTER_INSTANCE */:
                this.processInstanceEnter(client, data);
                break;
            case 10 /* CHAT_MESSAGE */:
                this.processChat(client, data);
                break;
            case 14 /* OBJECT_STATS */:
                this.processStats(client, data);
                break;
            default:
                client.send(99 /* INVALID_OPCODE */, "Invalid OpCode", 4 /* BAD */);
                break;
        }
    };
    GameManager.prototype.processLogout = function (client) {
        if (!client.hasAccountData) {
            client.send(2 /* ACCOUNT_LOGOUT */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        client.setAccountData(null);
        client.send(2 /* ACCOUNT_LOGOUT */, "You have logged out.", 2 /* GOOD */);
    };
    GameManager.prototype.processCharacterList = function (client) {
        if (!client.hasAccountData) {
            client.send(3 /* CHARACTER_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        this._database.getCharacterList(client.accountID)
            .then(function (characterList) { return client.send(3 /* CHARACTER_LIST */, { characterList: characterList }, 2 /* GOOD */); })
            .catch(function (err) { return client.send(3 /* CHARACTER_LIST */, err.message, 4 /* BAD */); });
    };
    GameManager.prototype.processCharacterCreate = function (client, data) {
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
    GameManager.prototype.processCharacterSelect = function (client, data) {
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
    GameManager.prototype.processMapEnter = function (client, data) {
        if (!client.hasAccountData || !client.playerName) {
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
        if (client.player.map) {
            client.player.map.removeClient(client);
        }
        try {
            map.addClient(client); // sends the map join packet
        }
        catch (err) {
            client.send(7 /* ENTER_MAP */, err.message, 4 /* BAD */);
        }
    };
    GameManager.prototype.processInstanceEnter = function (client, data) {
        var _this = this;
        if (!client.hasAccountData || !client.playerName) {
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
                instance.on("empty", function () { return delete _this._instances[instance.instanceID]; });
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
                _this.loadPlayer(client)
                    .then(function () { return done(); })
                    .catch(function (err) { return client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */); });
            });
        }
        catch (err) {
            client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */);
        }
    };
    GameManager.prototype.processChat = function (client, data) {
        if (!client.hasAccountData || !client.playerName) {
            client.send(10 /* CHAT_MESSAGE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.chat, chat = _a === void 0 ? null : _a;
        if (typeof chat === "string") {
            if (chat.charAt(0) === "~" && client.accessLevel > 1) {
                this.adminCommand(client, chat);
            }
            else {
                client.player.map.submitChat(chat, client.playerName);
            }
        }
    };
    GameManager.prototype.processStats = function (client, data) {
        if (!client.hasAccountData || !client.player) {
            client.send(14 /* OBJECT_STATS */, "Account is not logged in.", 4 /* BAD */);
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
    GameManager.prototype.processPotionList = function (client) {
        if (!client.player) {
            client.send(19 /* POTION_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        client.send(19 /* POTION_LIST */, {}, 2 /* GOOD */);
    };
    GameManager.prototype.processAbilityList = function (client) {
        if (!client.player) {
            client.send(16 /* ABILITY_LIST */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
    };
    GameManager.prototype.loadPlayer = function (client) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.getCharacter(client.accountID, client.playerName)
                .then(function (saveData) {
                client.player = PlayerFactory_1.PlayerFactory.restoreFromSave(saveData);
                resolve(saveData);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    GameManager.prototype.adminCommand = function (client, chat) {
    };
    Object.defineProperty(GameManager.prototype, "numClients", {
        get: function () {
            return this._numClients;
        },
        enumerable: true,
        configurable: true
    });
    return GameManager;
}());
exports.GameManager = GameManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZS9HYW1lTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUE2RDtBQUk3RCw4REFBNkQ7QUFFN0QsNERBQTJEO0FBTzNEO0lBUUkscUJBQVksUUFBcUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRywrQkFBYyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLElBQXlCO1FBQTdDLGlCQWVDO1FBZEcsSUFBSSxNQUFNLEdBQWMsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxNQUFNLENBQUMsUUFBUSxnQkFBYSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQSxJQUFJO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLHVCQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQSxHQUFHO1lBQ2hCLFdBQVc7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxP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