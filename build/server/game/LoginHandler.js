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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsic2VydmVyL2dhbWUvTG9naW5IYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQW9EO0FBR3BEO0lBQUE7SUE2Q0EsQ0FBQztJQXhDVSxxQkFBSyxHQUFaLFVBQWEsTUFBaUIsRUFBRSxJQUFRO1FBQ3BDLElBQUcsTUFBTSxDQUFDLGNBQWMsRUFBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsNEJBQTRCLEVBQUUsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVFLE9BQU87U0FDVjtRQUVJLElBQUEsa0JBQWEsRUFBYixvQ0FBYSxFQUFFLGtCQUFhLEVBQWIsb0NBQWEsRUFBRSxpQkFBWSxFQUFaLG1DQUFZLENBQVM7UUFFeEQsSUFBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUseUVBQXlFLEVBQUUsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pILE9BQU87U0FDVjtRQUVELElBQUcsT0FBTyxLQUFLLFdBQVcsQ0FBQyx1QkFBdUIsRUFBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU87U0FDVjtRQUVELElBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsYUFBYSxFQUFFLDRCQUE0QixFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2FBQ3hDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFDLEVBQUUsYUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxzQkFBTSxHQUFiLFVBQWMsTUFBaUI7UUFDM0IsSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsY0FBYyxFQUFFLDJCQUEyQixFQUFFLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxhQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQTNDc0IsNkJBQXVCLEdBQVUsT0FBTyxDQUFDO0lBNENwRSxZQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0JBQUsifQ==