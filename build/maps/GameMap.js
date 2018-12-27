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
    GameMap.prototype.bulkUpdate = function (opCode, data, status, ignoreClient) {
        if (ignoreClient === void 0) { ignoreClient = null; }
        var json = JSON.stringify({ opCode: opCode, data: data, status: status });
        this.forEachClient(function (client) {
            if (client !== ignoreClient) {
                client.sendString(json);
            }
        });
    };
    GameMap.prototype.submitChat = function (chat, from) {
        if (from === void 0) { from = null; }
        this.bulkUpdate(10 /* CHAT_MESSAGE */, { chat: chat, from: from }, 2 /* GOOD */);
    };
    GameMap.prototype.addClient = function (client, successBeforePlayerAdd) {
        var _this = this;
        if (!this.hasClient(client)) {
            this._clients[client.clientID] = client;
            this._numClients++;
            var mapState = this.getState();
            var playerState = client.player.getPlayerState();
            client.send(7 /* ENTER_MAP */, { mapState: mapState, playerState: playerState }, 2 /* GOOD */);
            var nextStep_1 = function () {
                _this.addUnit(client.player);
                _this.submitChat(client.player.name + " connected.");
            };
            if (successBeforePlayerAdd) {
                successBeforePlayerAdd(function () { return nextStep_1(); });
            }
            else {
                nextStep_1();
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
            this.submitChat(client.player.name + " disconnected.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbIm1hcHMvR2FtZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBc0M7QUFHdEMsaURBQTJGO0FBSzNGLHFEQUFvRDtBQVVwRDtJQUFzQywyQkFBWTtJQVE5QyxpQkFBWSxJQUFXLEVBQUUsT0FBZTtRQUF4QyxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLDRCQUFVLEdBQWxCLFVBQW1CLE1BQWEsRUFBRSxJQUFTLEVBQUUsTUFBYyxFQUFFLFlBQTRCO1FBQTVCLDZCQUFBLEVBQUEsbUJBQTRCO1FBQ3JGLElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLFFBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFBLE1BQU07WUFDckIsSUFBRyxNQUFNLEtBQUssWUFBWSxFQUFDO2dCQUN2QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNEJBQVUsR0FBakIsVUFBa0IsSUFBVyxFQUFFLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsV0FBZ0I7UUFDM0MsSUFBSSxDQUFDLFVBQVUsd0JBQXNCLEVBQUMsSUFBSSxNQUFBLEVBQUUs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