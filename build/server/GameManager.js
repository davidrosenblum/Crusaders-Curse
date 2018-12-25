"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
var PlayerFactory_1 = require("../entities/PlayerFactory");
var GameManager = /** @class */ (function () {
    function GameManager(database) {
        this._accounts = {};
        this._clients = {};
        this._numClients = 0;
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
            client.send(1 /* ACCOUNT_LOGIN */, "Invalid request json.", 4 /* BAD */);
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
            client.send(4 /* CHARACTER_CREATE */, "Invalid request json.", 4 /* BAD */);
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
            client.send(4 /* CHARACTER_CREATE */, "Invalid archetype.", 4 /* BAD */);
            return;
        }
        this._database.createCharacter(client.accountID, archetypeID, name, skin)
            .then(function (report) { return client.send(4 /* CHARACTER_CREATE */, report, 2 /* GOOD */); })
            .catch(function (err) { return client.send(4 /* CHARACTER_CREATE */, err.message, 4 /* BAD */); });
    };
    GameManager.prototype.processCharacterSelect = function (client, data) {
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
            .then(function () {
            // join map! 
        })
            .catch(function (err) {
            client.setPlayerName(null);
            client.send(6 /* CHARACTER_SELECT */, err.message, 4 /* BAD */);
        });
    };
    GameManager.prototype.loadPlayer = function (client) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.getCharacter(client.accountID, client.playerName)
                .then(function (saveData) {
                client.player = PlayerFactory_1.PlayerFactory.restoreFromSave(saveData);
                resolve(client.player);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFJN0QsMkRBQTBEO0FBRTFEO0lBUUkscUJBQVksUUFBcUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLElBQXlCO1FBQTdDLGlCQWFDO1FBWkcsSUFBSSxNQUFNLEdBQWMsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUEsSUFBSTtZQUNuQix1QkFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRztZQUNoQixXQUFXO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixNQUFpQjtRQUNqQyxJQUFHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsRUFB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