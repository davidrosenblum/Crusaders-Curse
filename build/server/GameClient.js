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
        data = (typeof data === "string") ? { message: data } : data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9HYW1lQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMERBQXlEO0FBZ0J6RDtJQVVJLG9CQUFZLFVBQStCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0seUJBQUksR0FBWCxVQUFZLE1BQWEsRUFBRSxJQUFhLEVBQUUsTUFBeUI7UUFBeEMscUJBQUEsRUFBQSxXQUFhO1FBQUUsdUJBQUEsRUFBQSxxQkFBeUI7UUFDL0QsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxtQ0FBYyxHQUFyQixVQUFzQixXQUF1QjtRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBRUQsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBYzthQUF6QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVhLHdCQUFhLEdBQTNCLFVBQTRCLE1BQWlCLEVBQUUsT0FBMEIsRUFBRSxPQUFvQztRQUMzRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNwRCxJQUFJLE1BQWEsRUFBRSxJQUFRLENBQUM7WUFFNUIsSUFBRztnQkFDQyxJQUFJLElBQUksR0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUvQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2FBQzVCO1lBQ0QsT0FBTSxHQUFHLEVBQUM7Z0JBQ04sT0FBTzthQUNWO1lBRUQsT0FBTyxDQUFDLEVBQUMsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXREc0Isb0JBQVMsR0FBVSxLQUFLLENBQUM7SUFFakMsbUJBQVEsR0FBa0IsSUFBSSwrQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBcURwRSxpQkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLGdDQUFVIn0=