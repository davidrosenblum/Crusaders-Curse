"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountsCollection_1 = require("./collections/AccountsCollection");
var CharactersCollection_1 = require("./collections/CharactersCollection");
var DBController = /** @class */ (function () {
    function DBController(mongoDatabase) {
        this._database = mongoDatabase;
        this.createCollections();
    }
    DBController.prototype.createCollections = function () {
        var _this = this;
        this._database.createCollection("accounts", function (err, res) {
            _this._database.collection("accounts").createIndex({ username: 1 }, { unique: true });
        });
        this._database.createCollection("salts", function (err, res) {
            _this._database.collection("salts").createIndex({ username: 1 }, { unique: true });
        });
        this._database.createCollection("characters", function (err, res) {
            _this._database.collection("characters").createIndex({ name: 1 }, { unique: true });
        });
    };
    DBController.prototype.createAccount = function (username, password, accessLevel) {
        if (accessLevel === void 0) { accessLevel = 1; }
        return AccountsCollection_1.AccountsCollection.createAccount(this._database, username, password, accessLevel);
    };
    DBController.prototype.getAccount = function (username, password) {
        return AccountsCollection_1.AccountsCollection.getAccount(this._database, username, password);
    };
    DBController.prototype.createCharacter = function (accountID, archetypeID, name, skin) {
        return CharactersCollection_1.CharactersCollection.createCharacter(this._database, accountID, archetypeID, name, skin);
    };
    DBController.prototype.deleteCharacter = function (accountID, name) {
        return CharactersCollection_1.CharactersCollection.deleteCharacter(this._database, accountID, name);
    };
    DBController.prototype.getCharacter = function (accountID, name) {
        return CharactersCollection_1.CharactersCollection.getCharacter(this._database, accountID, name);
    };
    DBController.prototype.getCharacterList = function (accountID) {
        return CharactersCollection_1.CharactersCollection.getCharacterList(this._database, accountID);
    };
    DBController.prototype.updateCharacter = function (data) {
        return CharactersCollection_1.CharactersCollection.updateCharacter(this._database, data);
    };
    return DBController;
}());
exports.DBController = DBController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvREJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdUVBQXNFO0FBQ3RFLDJFQUF1SDtBQUV2SDtJQUdJLHNCQUFZLGFBQWdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyx3Q0FBaUIsR0FBekI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDakQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzlDLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNuRCxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxvQ0FBYSxHQUFwQixVQUFxQixRQUFlLEVBQUUsUUFBZSxFQUFFLFdBQW9CO1FBQXBCLDRCQUFBLEVBQUEsZUFBb0I7UUFDdkUsT0FBTyx1Q0FBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixRQUFlLEVBQUUsUUFBZTtRQUM5QyxPQUFPLHVDQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sc0NBQWUsR0FBdEIsVUFBdUIsU0FBZ0IsRUFBRSxXQUFrQixFQUFFLElBQVcsRUFBRSxJQUFZO1FBQ2xGLE9BQU8sMkNBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVNLHNDQUFlLEdBQXRCLFVBQXVCLFNBQWdCLEVBQUUsSUFBVztRQUNoRCxPQUFPLDJDQUFvQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU0sbUNBQVksR0FBbkIsVUFBb0IsU0FBZ0IsRUFBRSxJQUFXO1FBQzdDLE9BQU8sMkNBQW9CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBZ0I7UUFDcEMsT0FBTywyQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxzQ0FBZSxHQUF0QixVQUF1QixJQUFzQjtRQUN6QyxPQUFPLDJDQUFvQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksb0NBQVkifQ==