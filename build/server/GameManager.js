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
            default:
                client.send(99 /* INVALID_OPCODE */, "Invalid OpCode", 4 /* BAD */);
                break;
        }
    };
    GameManager.prototype.processLogin = function (client, data) {
        var _a = data.username, username = _a === void 0 ? null : _a, _b = data.password, password = _b === void 0 ? null : _b, _c = data.version, version = _c === void 0 ? null : _c;
        if (client.hasAccountData) {
            client.send(1 /* ACCOUNT_LOGIN */, "You are already logged in.", 4 /* BAD */);
            return;
        }
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
        var _a = data.name, name = _a === void 0 ? null : _a, _b = data.archetype, archetype = _b === void 0 ? null : _b, _c = data.skin, skin = _c === void 0 ? null : _c;
        if (!client.hasAccountData) {
            client.send(4 /* CHARACTER_CREATE */, "Account are not logged in.", 4 /* BAD */);
            return;
        }
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
        var name = data.name;
        if (!client.hasAccountData) {
            client.send(6 /* CHARACTER_SELECT */, "Account are not logged in.", 4 /* BAD */);
            return;
        }
        if (client.player) {
            client.send(6 /* CHARACTER_SELECT */, "Player already selected.", 4 /* BAD */);
            return;
        }
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
            instance.addClient(client); // sends the map join packet
        }
        catch (err) {
            client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */);
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