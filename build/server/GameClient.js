"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator_1 = require("../utils/TokenGenerator");
var GameClient = /** @class */ (function () {
    function GameClient(connection) {
        this._conn = connection;
        this._clientID = GameClient.tokenGen.nextToken();
        this._accountData = null;
        this._playerName = null;
        this.player = null;
    }
    GameClient.prototype.send = function (opCode, data, status) {
        if (data === void 0) { data = null; }
        if (status === void 0) { status = 2 /* GOOD */; }
        data = (typeof data === "string") ? { message: data } : data;
        this._conn.send(JSON.stringify({ opCode: opCode, data: data, status: status }) + GameClient.MSG_DELIM);
    };
    GameClient.prototype.sendString = function (string, delimit) {
        if (delimit === void 0) { delimit = true; }
        delimit ? this._conn.send("string" + GameClient.MSG_DELIM) : this._conn.send(string);
    };
    GameClient.prototype.setAccountData = function (accountData) {
        this._accountData = accountData;
    };
    GameClient.prototype.setPlayerName = function (playerName) {
        this._playerName = playerName;
    };
    Object.defineProperty(GameClient.prototype, "username", {
        get: function () {
            return this._accountData ? this._accountData.username : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "accountID", {
        get: function () {
            return this._accountData ? this._accountData.accountID : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "accessLevel", {
        get: function () {
            return this._accountData ? this._accountData.accessLevel : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "hasAccountData", {
        get: function () {
            return this._accountData = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "playerName", {
        get: function () {
            return this._playerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "clientID", {
        get: function () {
            return this._clientID;
        },
        enumerable: true,
        configurable: true
    });
    GameClient.parseRequests = function (client, message, handler) {
        message.utf8Data.split(GameClient.MSG_DELIM).forEach(function (msg) {
            var opCode, data;
            try {
                var json = JSON.parse(msg);
                opCode = json.opCode || -1;
                data = json.data || null;
            }
            catch (err) {
                return;
            }
            handler({ client: client, opCode: opCode, data: data });
        });
    };
    GameClient.MSG_DELIM = "?&?";
    GameClient.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return GameClient;
}());
exports.GameClient = GameClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9HYW1lQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMERBQXlEO0FBZ0J6RDtJQVdJLG9CQUFZLFVBQStCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0seUJBQUksR0FBWCxVQUFZLE1BQWEsRUFBRSxJQUFhLEVBQUUsTUFBeUI7UUFBeEMscUJBQUEsRUFBQSxXQUFhO1FBQUUsdUJBQUEsRUFBQSxxQkFBeUI7UUFDL0QsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVNLCtCQUFVLEdBQWpCLFVBQWtCLE1BQWEsRUFBRSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLGNBQW9CO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBUyxVQUFVLENBQUMsU0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTSxtQ0FBYyxHQUFyQixVQUFzQixXQUF1QjtRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBRU0sa0NBQWEsR0FBcEIsVUFBcUIsVUFBaUI7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVELHNCQUFXLGdDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaUNBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1DQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBYzthQUF6QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBVTthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRWEsd0JBQWEsR0FBM0IsVUFBNEIsTUFBaUIsRUFBRSxPQUEwQixFQUFFLE9BQW9DO1FBQzNHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ3BELElBQUksTUFBYSxFQUFFLElBQVEsQ0FBQztZQUU1QixJQUFHO2dCQUNDLElBQUksSUFBSSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRS9CLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7YUFDNUI7WUFDRCxPQUFNLEdBQUcsRUFBQztnQkFDTixPQUFPO2FBQ1Y7WUFFRCxPQUFPLENBQUMsRUFBQyxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNUVzQixvQkFBUyxHQUFVLEtBQUssQ0FBQztJQUVqQyxtQkFBUSxHQUFrQixJQUFJLCtCQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUEyRXBFLGlCQUFDO0NBQUEsQUE5RUQsSUE4RUM7QUE5RVksZ0NBQVUifQ==