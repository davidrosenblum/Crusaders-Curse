"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandlerUtils_1 = require("../../utils/RequestHandlerUtils");
var AccountCreateHandler = /** @class */ (function () {
    function AccountCreateHandler() {
    }
    AccountCreateHandler.createAccount = function (db, req, res) {
        RequestHandlerUtils_1.RequestHandlerUtils.readPostBody(req, function (err, json) {
            if (!err) {
                var _a = json.username, username = _a === void 0 ? null : _a, _b = json.password, password = _b === void 0 ? null : _b;
                db.createAccount(username, password)
                    .then(function (response) {
                    res.writeHead(200);
                    res.end(response);
                })
                    .catch(function (err) {
                    res.writeHead(400);
                    res.end(err.message);
                });
            }
            else {
                res.writeHead(400);
                res.end(err.message);
            }
        });
    };
    return AccountCreateHandler;
}());
exports.AccountCreateHandler = AccountCreateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudENyZWF0ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvaGFuZGxlcnMvQWNjb3VudENyZWF0ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1RUFBc0U7QUFFdEU7SUFBQTtJQXNCQSxDQUFDO0lBckJpQixrQ0FBYSxHQUEzQixVQUE0QixFQUFlLEVBQUUsR0FBbUIsRUFBRSxHQUFvQjtRQUNsRix5Q0FBbUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDNUMsSUFBRyxDQUFDLEdBQUcsRUFBQztnQkFDQyxJQUFBLGtCQUFhLEVBQWIsb0NBQWEsRUFBRSxrQkFBYSxFQUFiLG9DQUFhLENBQVM7Z0JBRTFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztxQkFDL0IsSUFBSSxDQUFDLFVBQUEsUUFBUTtvQkFDVixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRztvQkFDTixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7YUFDVjtpQkFDRztnQkFDQSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQXRCWSxvREFBb0IifQ==