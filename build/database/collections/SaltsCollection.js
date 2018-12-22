"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaltsCollection = /** @class */ (function () {
    function SaltsCollection() {
    }
    SaltsCollection.storeSalt = function (database, username, salt) {
        var saltDoc = { username: username, salt: salt };
        return database.collection("salts").insertOne(saltDoc);
    };
    SaltsCollection.getSalt = function (database, username) {
        return new Promise(function (resolve, reject) {
            database.collection("salts").findOne({ username: username })
                .then(function (result) { return result ? resolve(result) : reject(new Error("Salt not found.")); })
                .catch(function (err) { return reject(err); });
        });
    };
    return SaltsCollection;
}());
exports.SaltsCollection = SaltsCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsdHNDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvY29sbGVjdGlvbnMvU2FsdHNDb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7SUFBQTtJQWNBLENBQUM7SUFiaUIseUJBQVMsR0FBdkIsVUFBd0IsUUFBVyxFQUFFLFFBQWUsRUFBRSxJQUFXO1FBQzdELElBQUksT0FBTyxHQUFnQixFQUFDLFFBQVEsVUFBQSxFQUFFLElBQUksTUFBQSxFQUFDLENBQUM7UUFFNUMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRWEsdUJBQU8sR0FBckIsVUFBc0IsUUFBVyxFQUFFLFFBQWU7UUFDOUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsUUFBUSxVQUFBLEVBQUMsQ0FBQztpQkFDM0MsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQS9ELENBQStELENBQUM7aUJBQy9FLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksMENBQWUifQ==