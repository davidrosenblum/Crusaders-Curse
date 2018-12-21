"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RNG = /** @class */ (function () {
    function RNG() {
    }
    RNG.nextInt = function (min, max) {
        if (min === void 0) { min = 0; }
        return Math.round(RNG.nextNum(min, max));
    };
    RNG.nextNum = function (min, max) {
        if (min === void 0) { min = 0; }
        if (typeof max !== "number")
            max = min + 1;
        return Math.random() * (max - min) + min;
    };
    return RNG;
}());
exports.RNG = RNG;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUk5HLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsidXRpbHMvUk5HLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFBQTtJQVVBLENBQUM7SUFUVSxXQUFPLEdBQWQsVUFBZSxHQUFZLEVBQUUsR0FBVztRQUF6QixvQkFBQSxFQUFBLE9BQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLFdBQU8sR0FBZCxVQUFlLEdBQVksRUFBRSxHQUFXO1FBQXpCLG9CQUFBLEVBQUEsT0FBWTtRQUN2QixJQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVE7WUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUUxQyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDN0MsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGtCQUFHIn0=