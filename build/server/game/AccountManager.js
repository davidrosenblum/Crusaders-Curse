"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../../../data/Data");
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.login = function (client, data) {
        if (client.hasAccountData) {
            client.send(Data_1.OpCode.ACCOUNT_LOGIN, "You are already logged in.", Data_1.Status.BAD);
            return;
        }
        var _a = data.username, username = _a === void 0 ? null : _a, _b = data.password, password = _b === void 0 ? null : _b, _c = data.version, version = _c === void 0 ? null : _c;
        if (!username || !password || !version) {
            client.send(Data_1.OpCode.ACCOUNT_LOGIN, "Invalid request json - missing username and/or password and/or version.", Data_1.Status.BAD);
            return;
        }
        if (version !== GameManager.CLIENT_VERSION_REQUIRED) {
            client.send(Data_1.OpCode.ACCOUNT_LOGIN, "Wrong client version.", Data_1.Status.BAD);
            return;
        }
        if (username in this._accounts) {
            client.send(Data_1.OpCode.ACCOUNT_LOGIN, "Account already logged in.", Data_1.Status.BAD);
            return;
        }
        this._database.getAccount(username, password)
            .then(function (account) {
            client.setAccountData(account);
            client.send(Data_1.OpCode.ACCOUNT_LOGIN, { clientID: client.clientID }, Data_1.Status.GOOD);
        })
            .catch(function (err) { return client.send(Data_1.OpCode.ACCOUNT_LOGIN, err.message, Data_1.Status.BAD); });
    };
    Login.prototype.logout = function (client) {
        if (!client.hasAccountData) {
            client.send(Data_1.OpCode.ACCOUNT_LOGOUT, "Account is not logged in.", Data_1.Status.BAD);
            return;
        }
        client.setAccountData(null);
        client.send(Data_1.OpCode.ACCOUNT_LOGOUT, "You have logged out.", Data_1.Status.GOOD);
    };
    Login.CLIENT_VERSION_REQUIRED = "0.1.0";
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudE1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZS9BY2NvdW50TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUFvRDtBQUdwRDtJQUFBO0lBNkNBLENBQUM7SUF4Q1UscUJBQUssR0FBWixVQUFhLE1BQWlCLEVBQUUsSUFBUTtRQUNwQyxJQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsYUFBYSxFQUFFLDRCQUE0QixFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFSSxJQUFBLGtCQUFhLEVBQWIsb0NBQWEsRUFBRSxrQkFBYSxFQUFiLG9DQUFhLEVBQUUsaUJBQVksRUFBWixtQ0FBWSxDQUFTO1FBRXhELElBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsYUFBYSxFQUFFLHlFQUF5RSxFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6SCxPQUFPO1NBQ1Y7UUFFRCxJQUFHLE9BQU8sS0FBSyxXQUFXLENBQUMsdUJBQXVCLEVBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsYUFBYSxFQUFFLHVCQUF1QixFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxPQUFPO1NBQ1Y7UUFFRCxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGFBQWEsRUFBRSw0QkFBNEIsRUFBRSxhQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQzthQUN4QyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBQyxFQUFFLGFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFNLENBQUMsR0FBRyxDQUFDLEVBQTFELENBQTBELENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0sc0JBQU0sR0FBYixVQUFjLE1BQWlCO1FBQzNCLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGNBQWMsRUFBRSwyQkFBMkIsRUFBRSxhQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsYUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUEzQ3NCLDZCQUF1QixHQUFVLE9BQU8sQ0FBQztJQTRDcEUsWUFBQztDQUFBLEFBN0NELElBNkNDO0FBN0NZLHNCQUFLIn0=