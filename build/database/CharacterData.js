"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterData = /** @class */ (function () {
    function CharacterData(config) {
    }
    CharacterData.fromDatabase = function (result) {
        var account_id = result.account_id, name = result.name, level = result.level, xp = result.xp, gold = result.gold, skin = result.skin, potions = result.potions, last_map = result.last_map;
        return new CharacterData();
    };
    Object.defineProperty(CharacterData.prototype, "accountID", {
        get: function () {
            return this._accountID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterData.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterData.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterData.prototype, "xp", {
        get: function () {
            return this._xp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterData.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterData.prototype, "skin", {
        get: function () {
            return this._skin;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterData;
}());
exports.CharacterData = CharacterData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImRhdGFiYXNlL0NoYXJhY3RlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE0QkE7SUFVSSx1QkFBWSxNQUEwQjtJQUV0QyxDQUFDO0lBRWEsMEJBQVksR0FBMUIsVUFBMkIsTUFBTTtRQUN4QixJQUFBLDhCQUFVLEVBQUUsa0JBQUksRUFBRSxvQkFBSyxFQUFFLGNBQUUsRUFBRSxrQkFBSSxFQUFFLGtCQUFJLEVBQUUsd0JBQU8sRUFBRSwwQkFBUSxDQUFXO1FBRTFFLE9BQU8sSUFBSSxhQUFhLEVBRXZCLENBQUM7SUFDTixDQUFDO0lBRUQsc0JBQVcsb0NBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw2QkFBRTthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLCtCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFDTCxvQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0NBQWEifQ==