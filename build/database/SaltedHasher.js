"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator_1 = require("./../utils/TokenGenerator");
var SaltedHasher = /** @class */ (function () {
    function SaltedHasher(passwordSize) {
        this._passwordSize = passwordSize;
    }
    SaltedHasher.prototype.salt = function (input) {
        if (input.length < this.passwordSize) {
            var size = this.passwordSize - input.length;
            return TokenGenerator_1.TokenGenerator.anyToken(size);
        }
        return "";
    };
    SaltedHasher.prototype.hash = function (input) {
        var buffer = new Array(input.length);
        for (var i = 0; i < buffer.length; i++) {
            buffer[i] = SaltedHasher.HASH_VALS[(i + input.charCodeAt(i)) % SaltedHasher.HASH_VALS.length];
        }
        return buffer.join("");
    };
    Object.defineProperty(SaltedHasher.prototype, "passwordSize", {
        get: function () {
            return this._passwordSize;
        },
        enumerable: true,
        configurable: true
    });
    SaltedHasher.HASH_VALS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    return SaltedHasher;
}());
exports.SaltedHasher = SaltedHasher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsdGVkSGFzaGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvU2FsdGVkSGFzaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQTJEO0FBRTNEO0lBS0ksc0JBQVksWUFBbUI7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7SUFDdEMsQ0FBQztJQUVNLDJCQUFJLEdBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFDO1lBQ2hDLElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNuRCxPQUFPLCtCQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU0sMkJBQUksR0FBWCxVQUFZLEtBQVk7UUFDcEIsSUFBSSxNQUFNLEdBQVksSUFBSSxLQUFLLENBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELEtBQUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUM5QixDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzVELENBQUM7U0FDTDtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQVcsc0NBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUE5QnVCLHNCQUFTLEdBQVksZ0VBQWdFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBK0I1SCxtQkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLG9DQUFZIn0=