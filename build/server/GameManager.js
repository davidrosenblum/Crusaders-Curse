"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFJN0Q7SUFRSSxxQkFBWSxRQUFxQjtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sa0NBQVksR0FBbkIsVUFBb0IsSUFBeUI7UUFBN0MsaUJBYUM7UUFaRyxJQUFJLE1BQU0sR0FBYyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQSxJQUFJO1lBQ25CLHVCQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQSxHQUFHO1lBQ2hCLFdBQVc7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLE1BQWlCO1FBQ2pDLElBQUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7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