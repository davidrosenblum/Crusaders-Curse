"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountsHandler = /** @class */ (function () {
    function AccountsHandler(database) {
        this._database = database;
        this._accounts = {};
    }
    AccountsHandler.prototype.login = function (client, data) {
        var _this = this;
        if (client.hasAccountData) {
            client.send(1 /* ACCOUNT_LOGIN */, "You are already logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.username, username = _a === void 0 ? null : _a, _b = data.password, password = _b === void 0 ? null : _b, _c = data.version, version = _c === void 0 ? null : _c;
        if (!username || !password || !version) {
            client.send(1 /* ACCOUNT_LOGIN */, "Invalid request json - missing username and/or password and/or version.", 4 /* BAD */);
            return;
        }
        if (version !== AccountsHandler.CLIENT_VERSION_REQUIRED) {
            client.send(1 /* ACCOUNT_LOGIN */, "Wrong client version.", 4 /* BAD */);
            return;
        }
        if (username in this._accounts) {
            client.send(1 /* ACCOUNT_LOGIN */, "Account already logged in.", 4 /* BAD */);
            return;
        }
        this._database.getAccount(username, password)
            .then(function (account) {
            _this._accounts[username] = client;
            client.setAccountData(account);
            client.send(1 /* ACCOUNT_LOGIN */, { clientID: client.clientID }, 2 /* GOOD */);
        })
            .catch(function (err) { return client.send(1 /* ACCOUNT_LOGIN */, err.message, 4 /* BAD */); });
    };
    AccountsHandler.prototype.logout = function (client) {
        if (!client.hasAccountData) {
            delete this._accounts[client.username];
            client.send(2 /* ACCOUNT_LOGOUT */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        delete this._accounts[client.username];
        client.setAccountData(null);
        client.send(2 /* ACCOUNT_LOGOUT */, "You have logged out.", 2 /* GOOD */);
    };
    AccountsHandler.CLIENT_VERSION_REQUIRED = "0.1.0";
    return AccountsHandler;
}());
exports.AccountsHandler = AccountsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudHNIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsic2VydmVyL2dhbWVoYW5kbGVycy9BY2NvdW50c0hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQTtJQU1JLHlCQUFZLFFBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSwrQkFBSyxHQUFaLFVBQWEsTUFBaUIsRUFBRSxJQUFRO1FBQXhDLGlCQThCQztRQTdCRyxJQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksd0JBQXVCLDRCQUE0QixjQUFhLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBRUksSUFBQSxrQkFBYSxFQUFiLG9DQUFhLEVBQUUsa0JBQWEsRUFBYixvQ0FBYSxFQUFFLGlCQUFZLEVBQVosbUNBQVksQ0FBUztRQUV4RCxJQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLHdCQUF1Qix5RUFBeUUsY0FBYSxDQUFDO1lBQ3pILE9BQU87U0FDVjtRQUVELElBQUcsT0FBTyxLQUFLLGVBQWUsQ0FBQyx1QkFBdUIsRUFBQztZQUNuRCxNQUFNLENBQUMsSUFBSSx3QkFBdUIsdUJBQXVCLGNBQWEsQ0FBQztZQUN2RSxPQUFPO1NBQ1Y7UUFFRCxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLHdCQUF1Qiw0QkFBNEIsY0FBYSxDQUFDO1lBQzVFLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7YUFDeEMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUNULEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLElBQUksd0JBQXVCLEVBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUMsZUFBYyxDQUFDO1FBQ2hGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLHdCQUF1QixHQUFHLENBQUMsT0FBTyxjQUFhLEVBQTFELENBQTBELENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0sZ0NBQU0sR0FBYixVQUFjLE1BQWlCO1FBQzNCLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLElBQUkseUJBQXdCLDJCQUEyQixjQUFhLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLHlCQUF3QixzQkFBc0IsZUFBYyxDQUFDO0lBQzVFLENBQUM7SUFyRHNCLHVDQUF1QixHQUFVLE9BQU8sQ0FBQztJQXNEcEUsc0JBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSwwQ0FBZSJ9