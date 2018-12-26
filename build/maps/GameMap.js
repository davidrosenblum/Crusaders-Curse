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
    GameMap.prototype.bulkUpdate = function (opCode, data, status) {
        var json = JSON.stringify({ opCode: opCode, data: data, status: status });
        this.forEachClient(function (client) { return client.sendString(json); });
    };
    GameMap.prototype.submitChat = function (chat, from) {
        this.bulkUpdate(10 /* CHAT_MESSAGE */, { chat: chat, from: from }, 2 /* GOOD */);
    };
    GameMap.prototype.addClient = function (client, successBeforePlayerAdd) {
        var _this = this;
        if (!this.hasClient(client)) {
            this._clients[client.clientID] = client;
            this._numClients++;
            var mapState = this.getState();
            client.send(7 /* ENTER_MAP */, mapState, 2 /* GOOD */);
            if (successBeforePlayerAdd) {
                successBeforePlayerAdd(function () { return _this.addUnit(client.player); });
            }
            else {
                this.addUnit(client.player);
            }
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
    GameMap.prototype.getUnitStats = function (objectID) {
        var target = this.getObjectById(objectID);
        return target ? target.getCombatStats() : null;
    };
    GameMap.prototype.getObjectById = function (objectID) {
        return this._units[objectID] || null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbIm1hcHMvR2FtZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBc0M7QUFHdEMsaURBQTJGO0FBVzNGO0lBQXNDLDJCQUFZO0lBTzlDLGlCQUFZLE9BQWU7UUFBM0IsWUFDSSxpQkFBTyxTQU9WO1FBTEcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7O0lBQ3pCLENBQUM7SUFFTyw0QkFBVSxHQUFsQixVQUFtQixNQUFhLEVBQUUsSUFBUyxFQUFFLE1BQWM7UUFDdkQsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSw0QkFBVSxHQUFqQixVQUFrQixJQUFXLEVBQUUsSUFBVztRQUN0QyxJQUFJLENBQUMsVUFBVSx3QkFBc0IsRUFBQyxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBQyxlQUFjLENBQUM7SUFDcEUsQ0FBQztJQUVNLDJCQUFTLEdBQWhCLFVBQWlCLE1BQWlCLEVBQUUsc0JBQTRDO1FBQWhGLGlCQWdCQztRQWZHLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBQ3ZCLElBQUksQ0FB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