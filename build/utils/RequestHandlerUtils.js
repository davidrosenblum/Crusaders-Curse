"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandlerUtils = /** @class */ (function () {
    function RequestHandlerUtils() {
    }
    RequestHandlerUtils.readPostBody = function (req, callback) {
        var data = "";
        req.on("data", function (chunk) { return data += chunk; });
        req.on("end", function () {
            var json = null;
            try {
                json = JSON.parse(data);
            }
            catch (err) {
                callback(err, null);
            }
            callback(null, json);
        });
    };
    return RequestHandlerUtils;
}());
exports.RequestHandlerUtils = RequestHandlerUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXJVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInV0aWxzL1JlcXVlc3RIYW5kbGVyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBbUJBLENBQUM7SUFsQmlCLGdDQUFZLEdBQTFCLFVBQTJCLEdBQW1CLEVBQUUsUUFBcUM7UUFDakYsSUFBSSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBRXJCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxJQUFJLEtBQUssRUFBYixDQUFhLENBQUMsQ0FBQztRQUV2QyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksSUFBSSxHQUFPLElBQUksQ0FBQztZQUVwQixJQUFHO2dCQUNDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTSxHQUFHLEVBQUM7Z0JBQ04sUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtZQUVELFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLGtEQUFtQiJ9