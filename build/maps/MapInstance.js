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
var TokenGenerator_1 = require("../utils/TokenGenerator");
var MapInstance = /** @class */ (function (_super) {
    __extends(MapInstance, _super);
    function MapInstance(mapName, mapID, mapData) {
        var _this = _super.call(this) || this;
        _this._mapName = mapName;
        _this._mapID = mapID;
        _this._instanceID = MapInstance.tokenGen.nextToken();
        _this._mapData = mapData;
        _this._clients = {};
        _this._units = {};
        _this._transportNodes = {};
        _this._numClients = 0;
        return _this;
    }
    MapInstance.prototype.addClient = function (client) {
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
    MapInstance.prototype.removeClient = function (client) {
        if (this.hasClient(client)) {
            delete this._clients[client.clientID];
            this._numClients--;
            if (client.player) {
                this.removeUnit(client.player);
            }
        }
    };
    MapInstance.prototype.addUnit = function (unit) {
        if (!this.hasUnit(unit)) {
            this._units[unit.objectID] = unit;
            this.forEachClient(function (client) { return client.send(11 /* OBJECT_CREATE */, unit.getState(), 2 /* GOOD */); });
            return true;
        }
        return false;
    };
    MapInstance.prototype.removeUnit = function (unit) {
        if (delete this._units[unit.objectID]) {
            this.forEachClient(function (client) { return client.send(12 /* OBJECT_DELETE */, { objectID: unit.objectID }, 2 /* GOOD */); });
            return true;
        }
        return false;
    };
    MapInstance.prototype.createTransportNode = function (type, text, row, col, outMapID, outX, outY) {
        var tnode = new TransportNode_1.TransportNode(type, text, row, col, outMapID, outX, outY);
        this._transportNodes[tnode.nodeID] = tnode;
    };
    MapInstance.prototype.hasClient = function (client) {
        return client.clientID in this._clients;
    };
    MapInstance.prototype.hasUnit = function (unit) {
        return unit.objectID in this._units;
    };
    MapInstance.prototype.getState = function () {
        var unitStates = [];
        this.forEachUnit(function (unit) { return unitStates.push(unit.getState()); });
        var tnodeStates = [];
        this.forEachTransportNode(function (tnode) { return tnodeStates.push(tnode.getState()); });
        return { mapData: this._mapData, transportNodes: tnodeStates, units: unitStates };
    };
    MapInstance.prototype.forEachClient = function (fn) {
        for (var clientID in this._clients) {
            fn(this._clients[clientID], clientID);
        }
    };
    MapInstance.prototype.forEachUnit = function (fn) {
        for (var unitID in this._units) {
            fn(this._units[unitID], unitID);
        }
    };
    MapInstance.prototype.forEachTransportNode = function (fn) {
        for (var tnodeID in this._transportNodes) {
            fn(this._transportNodes[tnodeID], tnodeID);
        }
    };
    Object.defineProperty(MapInstance.prototype, "numClients", {
        get: function () {
            return this._numClients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInstance.prototype, "isEmpty", {
        get: function () {
            return this.numClients === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInstance.prototype, "mapName", {
        get: function () {
            return this._mapName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInstance.prototype, "mapID", {
        get: function () {
            return this._mapID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInstance.prototype, "instanceID", {
        get: function () {
            return this._instanceID;
        },
        enumerable: true,
        configurable: true
    });
    MapInstance.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return MapInstance;
}(events_1.EventEmitter));
exports.MapInstance = MapInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwSW5zdGFuY2UuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJtYXBzL01hcEluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFzQztBQUd0QyxpREFBd0U7QUFDeEUsMERBQXlEO0FBVXpEO0lBQWlDLCtCQUFZO0lBWXpDLHFCQUFZLE9BQWMsRUFBRSxLQUFZLEVBQUUsT0FBa0I7UUFBNUQsWUFDSSxpQkFBTyxTQVVWO1FBUkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztJQUN6QixDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsTUFBaUI7UUFDOUIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixJQUFJLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLG9CQUFtQixRQUFRLGVBQWMsQ0FBQztZQUVyRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjs7WUFD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