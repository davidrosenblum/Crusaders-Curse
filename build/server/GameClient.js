"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator_1 = require("../utils/TokenGenerator");
var GameClient = /** @class */ (function () {
    function GameClient(connection) {
        this._conn = connection;
        this._clientID = GameClient.tokenGen.nextToken();
        this._accountData = null;
        this.player = null;
    }
    GameClient.prototype.send = function (opCode, data, status) {
        if (data === void 0) { data = null; }
        if (status === void 0) { status = 2 /* GOOD */; }
        this._conn.send(JSON.stringify({ opCode: opCode, data: data, status: status }));
    };
    GameClient.prototype.setAccountData = function (accountData) {
        this._accountData = accountData;
    };
    Object.defineProperty(GameClient.prototype, "username", {
        get: function () {
            return this._accountData ? this._accountData.username : null;
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
    Object.defineProperty(GameClient.prototype, "clientID", {
        get: function () {
            return this._clientID;
        },
        enumerable: true,
        configurable: true
    });
    GameClient.parseRequests = function (message, handler) {
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
            handler({ opCode: opCode, data: data });
        });
    };
    GameClient.MSG_DELIM = "?&?";
    GameClient.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return GameClient;
}());
exports.GameClient = GameClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9HYW1lQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMERBQXlEO0FBU3pEO0lBVUksb0JBQVksVUFBK0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSx5QkFBSSxHQUFYLFVBQVksTUFBYSxFQUFFLElBQWEsRUFBRSxNQUF5QjtRQUF4QyxxQkFBQSxFQUFBLFdBQWE7UUFBRSx1QkFBQSxFQUFBLHFCQUF5QjtRQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLG1DQUFjLEdBQXJCLFVBQXNCLFdBQXVCO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQkFBVyxnQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFjO2FBQXpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRWEsd0JBQWEsR0FBM0IsVUFBNEIsT0FBMEIsRUFBRSxPQUFnQztRQUNwRixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNwRCxJQUFJLE1BQWEsRUFBRSxJQUFRLENBQUM7WUFFNUIsSUFBRztnQkFDQyxJQUFJLElBQUksR0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUvQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2FBQzVCO1lBQ0QsT0FBTSxHQUFHLEVBQUM7Z0JBQ04sT0FBTzthQUNWO1lBRUQsT0FBTyxDQUFDLEVBQUMsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXBEc0Isb0JBQVMsR0FBVSxLQUFLLENBQUM7SUFFakMsbUJBQVEsR0FBa0IsSUFBSSwrQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBbURwRSxpQkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLGdDQUFVIn0=