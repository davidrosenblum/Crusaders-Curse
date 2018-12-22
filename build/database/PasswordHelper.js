"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaltedHasher = /** @class */ (function () {
    function SaltedHasher(passwordSize) {
        this._passwordSize = passwordSize;
    }
    SaltedHasher.prototype.salt = function (input) {
        if (input.length < DBController.PASSWORD_SIZE) {
            var size = DBController.PASSWORD_SIZE - input.length;
            return TokenGenerator.anyToken(size);
        }
        return "";
    };
    Object.defineProperty(SaltedHasher.prototype, "passwordSize", {
        get: function () {
            return this._passwordSize;
        },
        enumerable: true,
        configurable: true
    });
    SaltedHasher.hash = function (input) {
        var buffer = new Array(input.length);
        for (var i = 0; i < buffer.length; i++) {
            buffer[i] = DBController.HASH_VALS[(i + input.charCodeAt(i)) % DBController.HASH_VALS.length];
        }
        return buffer.join("");
    };
    SaltedHasher.HASH_VALS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    return SaltedHasher;
}());
exports.SaltedHasher = SaltedHasher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFzc3dvcmRIZWxwZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJkYXRhYmFzZS9QYXNzd29yZEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBS0ksc0JBQVksWUFBbUI7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7SUFDdEMsQ0FBQztJQUVNLDJCQUFJLEdBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsYUFBYSxFQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFVLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM1RCxPQUFPLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxzQkFBVyxzQ0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVjLGlCQUFJLEdBQW5CLFVBQW9CLEtBQVk7UUFDNUIsSUFBSSxNQUFNLEdBQVksSUFBSSxLQUFLLENBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUM5QixDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzVELENBQUM7U0FDTDtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBOUJ1QixzQkFBUyxHQUFZLGdFQUFnRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQStCNUgsbUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztBQWhDWSxvQ0FBWSJ9