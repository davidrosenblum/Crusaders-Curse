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
var TokenGenerator_1 = require("../utils/TokenGenerator");
var GameObject = /** @class */ (function (_super) {
    __extends(GameObject, _super);
    function GameObject(config) {
        var _this = _super.call(this) || this;
        _this._objectID = GameObject.tokenGen.nextToken();
        _this._ownerID = config.ownerID || null;
        _this._name = config.name;
        _this._type = config.type;
        _this.x = config.x;
        _this.y = config.y;
        _this.team = config.team || null;
        _this.anim = config.anim || null;
        _this.facing = config.facing || "down" /* DOWN */;
        _this.moveSpeed = 1;
        _this.isStunned = false;
        _this._spawnCoords = config.spawnCoords ? { row: config.spawnCoords.row || 0, col: config.spawnCoords.col || 0 } : null;
        return _this;
    }
    GameObject.prototype.inRange = function (target, range) {
        if (target.x < this.x + range && this.x < target.x + range) {
            if (target.y < this.y + range && this.y < target.y + range) {
                return true;
            }
        }
        return false;
    };
    GameObject.prototype.setState = function (state) {
        var _a = state.x, x = _a === void 0 ? this.x : _a, _b = state.y, y = _b === void 0 ? this.y : _b, _c = state.anim, anim = _c === void 0 ? this.anim : _c, _d = state.facing, facing = _d === void 0 ? this.facing : _d, _e = state.moveSpeed, moveSpeed = _e === void 0 ? this.moveSpeed : _e, _f = state.stunned, stunned = _f === void 0 ? this.isStunned : _f;
        this._x = x;
        this._y = y;
        this._anim = anim;
        this._facing = facing;
        this._moveSpeed = moveSpeed;
        this._stunned = stunned;
        this.emit("update");
    };
    GameObject.prototype.getState = function () {
        return {
            objectID: this.objectID,
            ownerID: this.ownerID,
            team: this.team,
            name: this.name,
            type: this.type,
            x: this.x,
            y: this.y,
            anim: this.anim,
            facing: this.facing,
            moveSpeed: this.moveSpeed,
            stunned: this.isStunned,
            spawnCoords: this._spawnCoords
        };
    };
    Object.defineProperty(GameObject.prototype, "team", {
        get: function () {
            return this._team;
        },
        set: function (value) {
            this._team = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
            this.emit("update", { x: x });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
            this.emit("update", { y: y });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "anim", {
        get: function () {
            return this._anim;
        },
        set: function (anim) {
            this._anim = anim;
            this.emit("update", { anim: anim });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "facing", {
        get: function () {
            return this._facing;
        },
        set: function (facing) {
            this._facing = facing;
            this.emit("update", { facing: facing });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "moveSpeed", {
        get: function () {
            return this._moveSpeed;
        },
        set: function (moveSpeed) {
            this._moveSpeed = Math.abs(moveSpeed);
            this.emit("update", { moveSpeed: moveSpeed });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "isStunned", {
        get: function () {
            return this._stunned;
        },
        set: function (stunned) {
            this._stunned = stunned;
            this.emit("update", { stunned: stunned });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "objectID", {
        get: function () {
            return this._objectID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "ownerID", {
        get: function () {
            return this._ownerID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return GameObject;
}(events_1.EventEmitter));
exports.GameObject = GameObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL0dhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLDBEQUF5RDtBQXFEekQ7SUFBeUMsOEJBQVk7SUFnQmpELG9CQUFZLE1BQXVCO1FBQW5DLFlBQ0ksaUJBQU8sU0FjVjtRQVpHLEtBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsS0FBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxxQkFBZSxDQUFDO1FBQzNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFD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