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
        _this._name = config.name;
        _this._type = config.type;
        _this.teamID = config.teamID || null;
        _this.x = config.x || 0;
        _this.y = config.y || 0;
        _this.anim = config.anim || null;
        _this.facing = config.facing || "down" /* DOWN */;
        _this.moveSpeed = 1;
        _this.isStunned = false;
        return _this;
    }
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
            teamID: this.teamID,
            name: this.name,
            type: this.type,
            x: this.x,
            y: this.y,
            anim: this.anim,
            facing: this.facing,
            moveSpeed: this.moveSpeed,
            stunned: this.isStunned
        };
    };
    Object.defineProperty(GameObject.prototype, "teamID", {
        get: function () {
            return this._teamID;
        },
        set: function (value) {
            this._teamID = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL0dhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLDBEQUF5RDtBQTBDekQ7SUFBeUMsOEJBQVk7SUFjakQsb0JBQVksTUFBdUI7UUFBbkMsWUFDSSxpQkFBTyxTQVlWO1FBVkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztRQUNwQyxLQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNoQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLHFCQUFlLENBQUM7UUFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O0lBQzNCLENBQUM7SUFFTSw2QkFBUSxHQUFmLFVBQWdCLEtBQXFCO1FBRTdCLElBQUEsWUFBUSxFQUFSLCtCQUFRLEVBQ1IsWUFBUSxFQUFSLCtCQUFRLEVBQ1IsZUFBYyxFQUFkLHFDQUFjLEVBQ2QsaUJBQWtCLEVBQWxCLHlDQUFrQixFQUNsQixvQkFBd0IsRUFBeEIsK0NBQXdCLEVBQ3hCLGtCQUFzQixFQUF0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