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
                return;
            }
            callback(null, json);
        });
    };
    RequestHandlerUtils.getCORSHeader = function (origin) {
        if (origin === void 0) { origin = "*"; }
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
        };
    };
    return RequestHandlerUtils;
}());
exports.RequestHandlerUtils = RequestHandlerUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXJVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInV0aWxzL1JlcXVlc3RIYW5kbGVyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBMkJBLENBQUM7SUExQmlCLGdDQUFZLEdBQTFCLFVBQTJCLEdBQW1CLEVBQUUsUUFBcUM7UUFDakYsSUFBSSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBRXJCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxJQUFJLEtBQUssRUFBYixDQUFhLENBQUMsQ0FBQztRQUV2QyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksSUFBSSxHQUFPLElBQUksQ0FBQztZQUVwQixJQUFHO2dCQUNDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTSxHQUFHLEVBQUM7Z0JBQ04sUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEIsT0FBTzthQUNWO1lBRUQsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSxpQ0FBYSxHQUEzQixVQUE0QixNQUFpQjtRQUFqQix1QkFBQSxFQUFBLFlBQWlCO1FBQ3pDLE9BQU87WUFDSCw2QkFBNkIsRUFBRSxNQUFNO1lBQ3JDLDhCQUE4QixFQUFFLDZCQUE2QjtTQUNoRSxDQUFDO0lBQ04sQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxrREFBbUIifQ==