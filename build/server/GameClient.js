"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator_1 = require("../utils/TokenGenerator");
var GameClient = /** @class */ (function () {
    function GameClient(connection) {
        this._conn = connection;
        this._clientID = GameClient.tokenGen.nextToken();
        this._accountData = null;
        this._selectedName = null;
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
        delimit ? this._conn.send("" + string + GameClient.MSG_DELIM) : this._conn.send(string);
    };
    GameClient.prototype.setAccountData = function (accountData) {
        this._accountData = accountData;
    };
    GameClient.prototype.setSelectedName = function (playerName) {
        this._selectedName = playerName;
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
            return this._accountData ? this._accountData.accountID : null;
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
            return this._accountData !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameClient.prototype, "selectedName", {
        get: function () {
            return this._selectedName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9HYW1lQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMERBQXlEO0FBZ0J6RDtJQVdJLG9CQUFZLFVBQStCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0seUJBQUksR0FBWCxVQUFZLE1BQWEsRUFBRSxJQUFhLEVBQUUsTUFBeUI7UUFBeEMscUJBQUEsRUFBQSxXQUFhO1FBQUUsdUJBQUEsRUFBQSxxQkFBeUI7UUFDL0QsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVNLCtCQUFVLEdBQWpCLFVBQWtCLE1BQWEsRUFBRSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLGNBQW9CO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRU0sbUNBQWMsR0FBckIsVUFBc0IsV0FBdUI7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7SUFDcEMsQ0FBQztJQUVNLG9DQUFlLEdBQXRCLFVBQXVCLFVBQWlCO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQkFBVyxnQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlDQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFjO2FBQXpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG9DQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFYSx3QkFBYSxHQUEzQixVQUE0QixNQUFpQixFQUFFLE9BQTBCLEVBQUUsT0FBb0M7UUFDM0csT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDcEQsSUFBSSxNQUFhLEVBQUUsSUFBUSxDQUFDO1lBRTVCLElBQUc7Z0JBQ0MsSUFBSSxJQUFJLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFL0IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQzthQUM1QjtZQUNELE9BQU0sR0FBRyxFQUFDO2dCQUNOLE9BQU87YUFDVjtZQUVELE9BQU8sQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1RXNCLG9CQUFTLEdBQVUsS0FBSyxDQUFDO0lBRWpDLG1CQUFRLEdBQWtCLElBQUksK0JBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQTJFcEUsaUJBQUM7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxnQ0FBVSJ9