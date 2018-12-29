"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMapFactory_1 = require("../../maps/GameMapFactory");
var InstancesHandler = /** @class */ (function () {
    function InstancesHandler() {
        this._instances = {};
        this._numInstances = 0;
    }
    InstancesHandler.prototype.processInstanceEnter = function (client, data) {
        var _this = this;
        if (!client.hasAccountData || !client.selectedName) {
            client.send(8 /* ENTER_INSTANCE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.instanceID, instanceID = _a === void 0 ? null : _a, _b = data.instanceType, instanceType = _b === void 0 ? null : _b;
        if (!instanceID && !instanceType) {
            client.send(8 /* ENTER_INSTANCE */, "Invalid request json - missing instance ID or new instance type.");
            return;
        }
        var instance = null;
        if (instanceID) {
            instance = this._instances[instanceID] || null;
        }
        else if (instanceType) {
            try {
                instance = GameMapFactory_1.GameMapFactory.createInstance(instanceType);
                instance.on("empty", function () {
                    delete _this._instances[instance.instanceID];
                    _this._numInstances--;
                });
            }
            catch (err) {
                client.send(8 /* ENTER_INSTANCE */, "Unable to create instance: " + err.message, 4 /* BAD */);
                return;
            }
        }
        if (!instance) {
            client.send(8 /* ENTER_INSTANCE */, "Instance not found.", 4 /* BAD */);
            return;
        }
        try {
            // sends the map join packet
            instance.addClient(client, function (done) {
                _this.loadPlayer(client)
                    .then(function () { return done(); })
                    .catch(function (err) { return client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */); });
            });
        }
        catch (err) {
            client.send(8 /* ENTER_INSTANCE */, err.message, 4 /* BAD */);
        }
    };
    Object.defineProperty(InstancesHandler.prototype, "numInstances", {
        get: function () {
            return this._numInstances;
        },
        enumerable: true,
        configurable: true
    });
    return InstancesHandler;
}());
exports.InstancesHandler = InstancesHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFuY2VzSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbInNlcnZlci9nYW1laGFuZGxlcnMvSW5zdGFuY2VzSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUEyRDtBQUUzRDtJQUlJO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLCtDQUFvQixHQUE1QixVQUE2QixNQUFpQixFQUFFLElBQVE7UUFBeEQsaUJBaURDO1FBaERHLElBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQztZQUM5QyxNQUFNLENBQUMsSUFBSSx5QkFBd0IsMkJBQTJCLGNBQWEsQ0FBQztZQUM1RSxPQUFPO1NBQ1Y7UUFFSSxJQUFBLG9CQUFlLEVBQWYsc0NBQWUsRUFBRSxzQkFBaUIsRUFBakIsd0NBQWlCLENBQVM7UUFFaEQsSUFBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLFlBQVksRUFBQztZQUM1QixNQUFNLENBQUMsSUFBSSx5QkFBd0Isa0VBQWtFLENBQUMsQ0FBQztZQUN2RyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBbUIsSUFBSSxDQUFDO1FBRXBDLElBQUcsVUFBVSxFQUFDO1lBQ1YsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO1NBQ2xEO2FBQ0ksSUFBRyxZQUFZLEVBQUM7WUFDakIsSUFBRztnQkFDQyxRQUFRLEdBQUcsK0JBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRXZELFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNqQixPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFNLEdBQUcsRUFBQztnQkFDTixNQUFNLENBQUMsSUFBSSx5QkFBd0IsZ0NBQThCLEdBQUcsQ0FBQyxPQUFTLGNBQWEsQ0FBQztnQkFDNUYsT0FBTzthQUNWO1NBQ0o7UUFFRCxJQUFHLENBQUMsUUFBUSxFQUFDO1lBQ1QsTUFBTSxDQUFDLElBQUkseUJBQXdCLHFCQUFxQixjQUFhLENBQUM7WUFDdEUsT0FBTztTQUNWO1FBRUQsSUFBRztZQUNDLDRCQUE0QjtZQUM1QixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFBLElBQUk7Z0JBQzNCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO3FCQUNsQixJQUFJLENBQUMsY0FBTSxPQUFBLElBQUksRUFBRSxFQUFOLENBQU0sQ0FBQztxQkFDbEIsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUkseUJBQXdCLEdBQUcsQ0FBQyxPQUFPLGNBQWEsRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFNLEdBQUcsRUFBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLHlCQUF3QixHQUFHLENBQUMsT0FBTyxjQUFhLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBRUQsc0JBQVcsMENBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDTCx1QkFBQztBQUFELENBQUMsQUEvREQsSUErREM7QUEvRFksNENBQWdCIn0=