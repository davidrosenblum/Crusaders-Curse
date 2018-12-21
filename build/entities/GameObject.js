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
        _this._teamID = config.teamID || null;
        _this._name = config.name;
        _this._type = config.type;
        _this._x = config.x || 0;
        _this._y = config.y || 0;
        _this._anim = config.anim || null;
        _this._facing = config.facing || "right";
        _this._moveSpeed = Math.abs(config.moveSpeed) || 1;
        _this._stunned = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL0dhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLDBEQUF5RDtBQW1DekQ7SUFBeUMsOEJBQVk7SUFjakQsb0JBQVksTUFBdUI7UUFBbkMsWUFDSSxpQkFBTyxTQVlWO1FBVkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFDckMsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNqQyxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztJQUMxQixDQUFDO0lBRU0sNkJBQVEsR0FBZixVQUFnQixLQUFxQjtRQUU3QixJQUFBLFlBQVEsRUFBUiwrQkFBUSxFQUNSLFlBQVEsRUFBUiwrQkFBUSxFQUNSLGVBQWMsRUFBZCxxQ0FBYyxFQUNkLGlCQUFrQixFQUFsQix5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