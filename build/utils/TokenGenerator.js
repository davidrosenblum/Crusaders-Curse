"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator = /** @class */ (function () {
    function TokenGenerator(tokenSize) {
        if (tokenSize === void 0) { tokenSize = 16; }
        this._tokenSize = tokenSize;
        this._tokens = {};
    }
    TokenGenerator.anyToken = function (size) {
        var buffer = new Array(size);
        for (var i = 0; i < size; i++) {
            buffer[i] = TokenGenerator.VALS[Math.round(Math.random() * TokenGenerator.VALS.length)];
        }
        return buffer.join("");
    };
    TokenGenerator.prototype.nextToken = function () {
        var token = null;
        do {
            token = TokenGenerator.anyToken(this.tokenSize);
        } while (this.hasToken(token));
        this._tokens[token] = true;
        return token;
    };
    TokenGenerator.prototype.releaseToken = function (token) {
        return delete this._tokens[token];
    };
    TokenGenerator.prototype.hasToken = function (token) {
        return token in this._tokens;
    };
    Object.defineProperty(TokenGenerator.prototype, "tokenSize", {
        get: function () {
            return this._tokenSize;
        },
        enumerable: true,
        configurable: true
    });
    TokenGenerator.VALS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    return TokenGenerator;
}());
exports.TokenGenerator = TokenGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5HZW5lcmF0b3IuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJ1dGlscy9Ub2tlbkdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBTUksd0JBQVksU0FBbUI7UUFBbkIsMEJBQUEsRUFBQSxjQUFtQjtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRWEsdUJBQVEsR0FBdEIsVUFBdUIsSUFBVztRQUM5QixJQUFJLE1BQU0sR0FBWSxJQUFJLEtBQUssQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUU5QyxLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN6RCxDQUFDO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLGtDQUFTLEdBQWhCO1FBQ0ksSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDO1FBRXhCLEdBQUU7WUFDRSxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQsUUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTNCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxxQ0FBWSxHQUFuQixVQUFvQixLQUFZO1FBQzVCLE9BQU8sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLEtBQVk7UUFDeEIsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQVcscUNBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUE1Q2MsbUJBQUksR0FBWSxnRUFBZ0UsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUE2QzlHLHFCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksd0NBQWMifQ==