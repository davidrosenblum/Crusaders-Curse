"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.login = function (client, data) {
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
    Login.prototype.logout = function (client) {
        if (!client.hasAccountData) {
            client.send(2 /* ACCOUNT_LOGOUT */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        client.setAccountData(null);
        client.send(2 /* ACCOUNT_LOGOUT */, "You have logged out.", 2 /* GOOD */);
    };
    Login.CLIENT_VERSION_REQUIRED = "0.1.0";
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsic2VydmVyL2dhbWUvaGFuZGxlcnMvTG9naW5IYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtJQTZDQSxDQUFDO0lBeENVLHFCQUFLLEdBQVosVUFBYSxNQUFpQixFQUFFLElBQVE7UUFDcEMsSUFBRyxNQUFNLENBQUMsY0FBYyxFQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLHdCQUF1Qiw0QkFBNEIsY0FBYSxDQUFDO1lBQzVFLE9BQU87U0FDVjtRQUVJLElBQUEsa0JBQWEsRUFBYixvQ0FBYSxFQUFFLGtCQUFhLEVBQWIsb0NBQWEsRUFBRSxpQkFBWSxFQUFaLG1DQUFZLENBQVM7UUFFeEQsSUFBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNsQyxNQUFNLENBQUMsSUFBSSx3QkFBdUIseUVBQXlFLGNBQWEsQ0FBQztZQUN6SCxPQUFPO1NBQ1Y7UUFFRCxJQUFHLE9BQU8sS0FBSyxXQUFXLENBQUMsdUJBQXVCLEVBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksd0JBQXVCLHVCQUF1QixjQUFhLENBQUM7WUFDdkUsT0FBTztTQUNWO1FBRUQsSUFBRyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBQztZQUMxQixNQUFNLENBQUMsSUFBSSx3QkFBdUIsNEJBQTRCLGNBQWEsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2FBQ3hDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLHdCQUF1QixFQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFDLGVBQWMsQ0FBQztRQUNoRixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSx3QkFBdUIsR0FBRyxDQUFDLE9BQU8sY0FBYSxFQUExRCxDQUEwRCxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLHNCQUFNLEdBQWIsVUFBYyxNQUFpQjtRQUMzQixJQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQztZQUN0QixNQUFNLENBQUMsSUFBSSx5QkFBd0IsMkJBQTJCLGNBQWEsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLHlCQUF3QixzQkFBc0IsZUFBYyxDQUFDO0lBQzVFLENBQUM7SUEzQ3NCLDZCQUF1QixHQUFVLE9BQU8sQ0FBQztJQTRDcEUsWUFBQztDQUFBLEFBN0NELElBNkNDO0FBN0NZLHNCQUFLIn0=