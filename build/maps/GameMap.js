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
var NPCFactory_1 = require("../entities/NPCFactory");
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap(name, mapData) {
        var _this = _super.call(this) || this;
        _this._name = name;
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
            client.send(7 /* ENTER_MAP */, { mapState: mapState }, 2 /* GOOD */);
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
            unit.setMap(this);
            var object_1 = unit.getState();
            this.forEachClient(function (client) { return client.send(11 /* OBJECT_CREATE */, { object: object_1 }, 2 /* GOOD */); });
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
    GameMap.prototype.createNPC = function (type, row, col, anim, name) {
        if (row === void 0) { row = 0; }
        if (col === void 0) { col = 0; }
        var x = this._mapData.tileSize * col;
        var y = this._mapData.tileSize * row;
        var npc = NPCFactory_1.NPCFactory.createNPC(type, { x: x, y: y, name: name, anim: anim });
        this.addUnit(npc);
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
        return { name: this.name, mapData: this._mapData, transportNodes: tnodeStates, units: unitStates };
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
    Object.defineProperty(GameMap.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return GameMap;
}(events_1.EventEmitter));
exports.GameMap = GameMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbIm1hcHMvR2FtZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBc0M7QUFHdEMsaURBQTJGO0FBSzNGLHFEQUFnRTtBQVNoRTtJQUFzQywyQkFBWTtJQVE5QyxpQkFBWSxJQUFXLEVBQUUsT0FBZTtRQUF4QyxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLDRCQUFVLEdBQWxCLFVBQW1CLE1BQWEsRUFBRSxJQUFTLEVBQUUsTUFBYztRQUN2RCxJQUFJLElBQUksR0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLDRCQUFVLEdBQWpCLFVBQWtCLElBQVcsRUFBRSxJQUFXO1FBQ3RDLElBQUksQ0FBQyxVQUFVLHdCQUFzQixFQUFDLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFDLGVBQWMsQ0FBQztJQUNwRSxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsTUFBaUIsRUFBRSxzQkFBNEM7UUFBaEYsaUJBZ0JDO1FBZkcs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