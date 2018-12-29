"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandlerUtils_1 = require("../../utils/RequestHandlerUtils");
var AccountCreateHandler = /** @class */ (function () {
    function AccountCreateHandler() {
    }
    AccountCreateHandler.createAccount = function (db, req, res) {
        RequestHandlerUtils_1.RequestHandlerUtils.readPostBody(req, function (err, json) {
            var headers = RequestHandlerUtils_1.RequestHandlerUtils.getCORSHeader();
            if (!err) {
                var _a = json.username, username_1 = _a === void 0 ? null : _a, _b = json.password, password = _b === void 0 ? null : _b;
                if (username_1 && password) {
                    db.createAccount(username_1, password)
                        .then(function (response) {
                        res.writeHead(200, headers);
                        res.end(response);
                    })
                        .catch(function (err) {
                        if (err.code === 11000) {
                            res.writeHead(400, headers);
                            res.end("Account \"" + username_1 + "\" already exists.");
                        }
                        else {
                            console.log(err.message);
                            res.writeHead(500, headers);
                            res.end("Internal server error.");
                        }
                    });
                }
                else {
                    res.writeHead(400, headers);
                    res.end("Invalid json - username and password required.");
                }
            }
            else {
                res.writeHead(400, headers);
                res.end(err.message);
            }
        });
    };
    return AccountCreateHandler;
}());
exports.AccountCreateHandler = AccountCreateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudENyZWF0ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvd2ViaGFuZGxlcnMvQWNjb3VudENyZWF0ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1RUFBc0U7QUFFdEU7SUFBQTtJQXFDQSxDQUFDO0lBcENpQixrQ0FBYSxHQUEzQixVQUE0QixFQUFlLEVBQUUsR0FBbUIsRUFBRSxHQUFvQjtRQUNsRix5Q0FBbUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDNUMsSUFBSSxPQUFPLEdBQTZCLHlDQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRTVFLElBQUcsQ0FBQyxHQUFHLEVBQUM7Z0JBQ0MsSUFBQSxrQkFBYSxFQUFiLHNDQUFhLEVBQUUsa0JBQWEsRUFBYixvQ0FBYSxDQUFTO2dCQUUxQyxJQUFHLFVBQVEsSUFBSSxRQUFRLEVBQUM7b0JBQ3BCLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBUSxFQUFFLFFBQVEsQ0FBQzt5QkFDL0IsSUFBSSxDQUFDLFVBQUEsUUFBUTt3QkFDVixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUc7d0JBQ04sSUFBRyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBQzs0QkFDbEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7NEJBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBWSxVQUFRLHVCQUFtQixDQUFDLENBQUM7eUJBQ3BEOzZCQUNHOzRCQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN6QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3lCQUNyQztvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDVjtxQkFDRztvQkFDQSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2lCQUM3RDthQUNKO2lCQUNHO2dCQUNBLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxvREFBb0IifQ==