"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var TransportNode_1 = require("./TransportNode");
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap(mapData) {
        var _this = _super.call(this) || this;
        _this._mapData = mapData;
        _this._clients = {};
        _this._units = {};
        _this._transportNodes = {};
        _this._numClients = 0;
        return _this;
    }
    GameMap.prototype.addClient = function (client) {
        if (!this.hasClient(client)) {
            this._clients[client.clientID] = client;
            this._numClients++;
            var mapState = this.getState();
            client.send(7 /* ENTER_MAP */, mapState, 2 /* GOOD */);
            this.addUnit(client.player);
        }
        else
            throw new Error("Already in map.");
    };
    GameMap.prototype.removeClient = function (client) {
        if (this.hasClient(client)) {
            delete this._clients[client.clientID];
            this._numClients--;
            if (client.player) {
                this.removeUnit(client.player);
            }
            if (this.isEmpty) {
                this.emit("empty");
            }
        }
    };
    GameMap.prototype.addUnit = function (unit) {
        if (!this.hasUnit(unit)) {
            this._units[unit.objectID] = unit;
            this.forEachClient(function (client) { return client.send(11 /* OBJECT_CREATE */, unit.getState(), 2 /* GOOD */); });
            return true;
        }
        return false;
    };
    GameMap.prototype.removeUnit = function (unit) {
        if (delete this._units[unit.objectID]) {
            this.forEachClient(function (client) { return client.send(12 /* OBJECT_DELETE */, { objectID: unit.objectID }, 2 /* GOOD */); });
            return true;
        }
        return false;
    };
    GameMap.prototype.createTransportNode = function (type, text, row, col, outMapID, outX, outY) {
        var tnode = new TransportNode_1.TransportNode(type, text, row, col, outMapID, outX, outY);
        this._transportNodes[tnode.nodeID] = tnode;
    };
    GameMap.prototype.hasClient = function (client) {
        return client.clientID in this._clients;
    };
    GameMap.prototype.hasUnit = function (unit) {
        return unit.objectID in this._units;
    };
    GameMap.prototype.getState = function () {
        var unitStates = [];
        this.forEachUnit(function (unit) { return unitStates.push(unit.getState()); });
        var tnodeStates = [];
        this.forEachTransportNode(function (tnode) { return tnodeStates.push(tnode.getState()); });
        return { mapData: this._mapData, transportNodes: tnodeStates, units: unitStates };
    };
    GameMap.prototype.forEachClient = function (fn) {
        for (var clientID in this._clients) {
            fn(this._clients[clientID], clientID);
        }
    };
    GameMap.prototype.forEachUnit = function (fn) {
        for (var unitID in this._units) {
            fn(this._units[unitID], unitID);
        }
    };
    GameMap.prototype.forEachTransportNode = function (fn) {
        for (var tnodeID in this._transportNodes) {
            fn(this._transportNodes[tnodeID], tnodeID);
        }
    };
    Object.defineProperty(GameMap.prototype, "numClients", {
        get: function () {
            return this._numClients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMap.prototype, "isEmpty", {
        get: function () {
            return this.numClients === 0;
        },
        enumerable: true,
        configurable: true
    });
    return GameMap;
}(events_1.EventEmitter));
exports.GameMap = GameMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbIm1hcHMvR2FtZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBc0M7QUFHdEMsaURBQTJGO0FBVTNGO0lBQXNDLDJCQUFZO0lBTzlDLGlCQUFZLE9BQWU7UUFBM0IsWUFDSSxpQkFBTyxTQU9WO1FBTEcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7O0lBQ3pCLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixNQUFpQjtRQUM5QixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLElBQUksUUFBUSxHQUFvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEQsTUFBTSxDQUFDLElBQUksb0JBQW1CLFFBQVEsZUFBYyxDQUFDO1lBRXJELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9COztZQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sOEJBQVksR0FBbkIsVUFBb0IsTUFBaUI7UUFDakMsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFD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