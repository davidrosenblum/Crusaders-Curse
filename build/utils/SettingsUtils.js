"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SettingsUtils = /** @class */ (function () {
    function SettingsUtils() {
    }
    SettingsUtils.load = function () {
        return new Promise(function (resolve, reject) {
            fs.readFile(SettingsUtils.PATH, function (err, data) {
                if (!err) {
                    var json = null;
                    try {
                        json = JSON.parse(data.toString());
                    }
                    catch (err) {
                        reject(err);
                    }
                    resolve(json);
                }
                else if (err.errno === -4058) {
                    SettingsUtils.writeDefault()
                        .then(function (settings) { return resolve(settings); })
                        .catch(function (err) { return reject(err); });
                }
                else
                    reject(err);
            });
        });
    };
    SettingsUtils.writeDefault = function () {
        return new Promise(function (resolve, reject) {
            fs.writeFile(SettingsUtils.PATH, JSON.stringify(SettingsUtils.DEFAULTS, null, 4), function (err) {
                err ? reject(err) : resolve(SettingsUtils.DEFAULTS);
            });
        });
    };
    SettingsUtils.PATH = "settings.json";
    SettingsUtils.DEFAULTS = {
        mongo_database: {
            uri: "mongodb://localhost:27017",
            database_name: "crusaders_curse"
        },
        server: {
            port: 8080
        },
        game: {
            double_xp: false
        }
    };
    return SettingsUtils;
}());
exports.SettingsUtils = SettingsUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInV0aWxzL1NldHRpbmdzVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBeUI7QUFlekI7SUFBQTtJQWdEQSxDQUFDO0lBaENpQixrQkFBSSxHQUFsQjtRQUNJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtnQkFDdEMsSUFBRyxDQUFDLEdBQUcsRUFBQztvQkFDSixJQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDO29CQUUvQixJQUFHO3dCQUNDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3FCQUN0QztvQkFDRCxPQUFNLEdBQUcsRUFBQzt3QkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Y7b0JBRUQsT0FBTyxDQUFDLElBQXNCLENBQUMsQ0FBQztpQkFDbkM7cUJBQ0ksSUFBRyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFDO29CQUN4QixhQUFhLENBQUMsWUFBWSxFQUFFO3lCQUN2QixJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQWpCLENBQWlCLENBQUM7eUJBQ25DLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztpQkFDbEM7O29CQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDBCQUFZLEdBQTFCO1FBQ0ksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQUEsR0FBRztnQkFDakYsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE5Q3NCLGtCQUFJLEdBQVUsZUFBZSxDQUFDO0lBRXRDLHNCQUFRLEdBQWtCO1FBQ3JDLGNBQWMsRUFBRTtZQUNaLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsYUFBYSxFQUFFLGlCQUFpQjtTQUNuQztRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQjtLQUNKLENBQUM7SUFrQ04sb0JBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSxzQ0FBYSJ9