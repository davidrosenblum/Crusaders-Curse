"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
var PlayerFactory_1 = require("../entities/PlayerFactory");
var GameMapFactory_1 = require("../maps/GameMapFactory");
var GameManager = /** @class */ (function () {
    function GameManager(database) {
        this._database = database;
        this._accounts = {};
        this._clients = {};
        this._numClients = 0;
        this._maps = {};
        this._instances = {};
    }
    GameManager.prototype.createClient = function (conn) {
        var _this = this;
        var client = new GameClient_1.GameClient(conn);
        conn.on("message", function (data) {
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
            default:
                client.send(99 /* INVALID_OPCODE */, "Invalid OpCode", 4 /* BAD */);
                break;
        }
    };
    GameManager.prototype.processLogin = function (client, data) {
        if (client.hasAccountData) {
            client.send(1 /* ACCOUNT_LOGIN */, "You are already logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.username, username = _a === void 0 ? null : _a, _b = data.password, password = _b === void 0 ? null : _b, _c = data.version, version = _c === void 0 ? null : _c;
        if (!username || !password || !version) {
            client.send(1 /* ACCOUNT_LOGIN */, "Invalid request json - missing username and/or password and/or version.", 4 /* BAD */);
            return;
        }
        if (version !== GameManager.CLIENT_VERSION_REQUIRED) {
            client.send(1 /* ACCOUNT_LOGIN */, "Wrong client version.", 4 /* BAD */);
            return;
        }
        if (username in this._accounts) {
            client.send(1 /* ACCOUNT_LOGIN */, "Account already logged in.", 4 /* BAD */);
            return;
        }
        this._database.getAccount(username, password)
            .then(function (account) {
            client.setAccountData(account);
            client.send(1 /* ACCOUNT_LOGIN */, { clientID: client.clientID }, 2 /* GOOD */);
        })
            .catch(function (err) { return client.send(1 /* ACCOUNT_LOGIN */, err.message, 4 /* BAD */); });
    };
    GameManager.prototype.processLogout = function (client) {
        if (!client.hasAccountData) {
            client.send(2 /* ACCOUNT_LOGOUT */, "Account are not logged in.", 4 /* BAD */);
            return;
        }
        client.setAccountData(null);
        client.send(2 /* ACCOUNT_LOGOUT */, "You have logged out.", 2 /* GOOD */);
    };
    GameManager.prototype.processCharacterList = function (client) {
        if (!client.hasAccountData) {
            client.send(3 /* CHARACTER_LIST */, "Account are not logged in.", 4 /* BAD */);
            return;
        }
        this._database.getCharacterList(client.accountID)
            .then(function (list) { return client.send(3 /* CHARACTER_LIST */, list, 2 /* GOOD */); })
            .catch(function (err) { return client.send(3 /* CHARACTER_LIST */, err.message, 4 /* BAD */); });
    };
    GameManager.prototype.processCharacterCreate = function (client, data) {
        if (!client.hasAccountData) {
            client.send(4 /* CHARACTER_CREATE */, "Account are not logged in.", 4 /* BAD */);
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
            .then(function (report) { return client.send(4 /* CHARACTER_CREATE */, report, 2 /* GOOD */); })
            .catch(function (err) { return client.send(4 /* CHARACTER_CREATE */, err.message, 4 /* BAD */); });
    };
    GameManager.prototype.processCharacterSelect = function (client, data) {
        var _this = this;
        if (!client.hasAccountData) {
            client.send(6 /* CHARACTER_SELECT */, "Account are not logged in.", 4 /* BAD */);
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
            client.send(7 /* ENTER_MAP */, "Account are not logged in.", 4 /* BAD */);
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
            client.send(8 /* ENTER_INSTANCE */, "Account are not logged in.", 4 /* BAD */);
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
            client.send(10 /* CHAT_MESSAGE */, "Account are not logged in.", 4 /* BAD */);
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
    GameManager.prototype.processStats = function () {
    };
    GameManager.prototype.processPotionList = function (client) {
        if (!client.hasAccountData || !client.player) {
            client.send(19 /* POTION_LIST */, "Account are not logged in.", 4 /* BAD */);
            return;
        }
    };
    GameManager.prototype.processAbilityList = function () {
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
    GameManager.CLIENT_VERSION_REQUIRED = "0.1.0";
    return GameManager;
}());
exports.GameManager = GameManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFJN0QsMkRBQTBEO0FBRTFELHlEQUF3RDtBQUl4RDtJQVVJLHFCQUFZLFFBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixJQUF5QjtRQUE3QyxpQkFhQztRQVpHLElBQUksTUFBTSxHQUFjLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFBLElBQUk7WUFDbkIsdUJBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBLEdBQUc7WUFDaEIsV0FBVztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUN0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