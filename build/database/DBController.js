"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBAccount_1 = require("./DBAccount");
var DBSchema_1 = require("./DBSchema");
var Data_1 = require("../data/Data");
var TokenGenerator_1 = require("../utils/TokenGenerator");
var DBController = /** @class */ (function () {
    function DBController(mongoDatabase) {
        this._database = mongoDatabase;
        this.createCollections();
    }
    DBController.salt = function (input) {
        if (input.length < DBController.PASSWORD_SIZE) {
            var size = DBController.PASSWORD_SIZE - input.length;
            return TokenGenerator_1.TokenGenerator.anyToken(size);
        }
        return "";
    };
    DBController.hash = function (input) {
        var buffer = new Array(input.length);
        for (var i = 0; i < buffer.length; i++) {
            buffer[i] = DBController.HASH_VALS[(i + input.charCodeAt(i)) % DBController.HASH_VALS.length];
        }
        return buffer.join("");
    };
    DBController.prototype.createCollections = function () {
        var _this = this;
        this._database.createCollection("accounts", function (err, res) {
            _this._database.collection("accounts").createIndex("username");
        });
        this._database.createCollection("salts", function (err, res) {
            _this._database.collection("salts").createIndex("username");
        });
        this._database.createCollection("characters", function (err, res) {
            _this._database.collection("characters").createIndex("name");
        });
    };
    DBController.prototype.createAccount = function (username, password, accessLevel) {
        var _this = this;
        if (accessLevel === void 0) { accessLevel = 1; }
        return new Promise(function (resolve, reject) {
            var salt = DBController.salt(password);
            var hash = DBController.hash(password + salt);
            // account ID will be generated by mongo so its not here (uses objectID)
            var account = {
                username: username,
                password: hash,
                access_level: accessLevel,
                enabled: true,
                date_joined: Date.now()
            };
            _this._database.collection("accounts").insertOne(account)
                .then(function (result) {
                if (result) {
                    _this.storeSalt(username, salt)
                        .then(function () { return resolve("Account " + username + " created."); })
                        .catch(function (err) { return reject(err); });
                }
                else
                    reject(new Error("Unable to create account " + username + "."));
            })
                .catch(function (err) { return reject(err); });
        });
    };
    DBController.prototype.getAccount = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.collection("accounts").findOne({ username: username })
                .then(function (result) {
                if (result) {
                    var account_1 = result;
                    _this.getSalt(username)
                        .then(function (saltDoc) {
                        var hash = DBController.hash(password + saltDoc.salt);
                        if (hash === account_1.password) {
                            if (account_1.enabled) {
                                resolve(new DBAccount_1.DBAccount(account_1.accountID, account_1.username));
                            }
                            else
                                reject(new Error("Account is disabled."));
                        }
                        else
                            reject(new Error("Wrong password."));
                    })
                        .catch(function (err) { return reject(err); });
                }
                else
                    reject(new Error("Username \"" + username + "\" not found."));
            })
                .catch(function (err) { return reject(err); });
        });
    };
    DBController.prototype.storeSalt = function (username, salt) {
        var saltDoc = { username: username, salt: salt };
        return this._database.collection("salts").insertOne(saltDoc);
    };
    DBController.prototype.getSalt = function (username) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.collection("salts").findOne({ username: username })
                .then(function (result) { return result ? resolve(result) : reject(new Error("Salt not found.")); })
                .catch(function (err) { return reject(err); });
        });
    };
    DBController.prototype.createCharacter = function (accountID, archetypeID, name, skin) {
        if (skin === void 0) { skin = 1; }
        var characterDoc = DBSchema_1.createDefaultCharacter(accountID, archetypeID, name, skin);
        return this._database.collection("characters").insertOne(characterDoc);
    };
    DBController.prototype.deleteCharacter = function (accountID, name) {
        return this._database.collection("characters").deleteOne({ account_id: accountID, name: name });
    };
    DBController.prototype.getCharacter = function (accountID, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.collection("characters").findOne({ accountID: accountID, name: name })
                .then(function (data) {
                if (data) {
                    resolve(data);
                }
                else
                    reject(new Error("Character " + name + " not found."));
            })
                .catch(function (err) { return reject(err); });
        });
    };
    DBController.prototype.getCharacterList = function (accountID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._database.collection("characters").find({ accountID: accountID }).toArray()
                .then(function (results) {
                var previews = new Array(results.length);
                results.forEach(function (result, index) {
                    previews[index] = {
                        name: result.name,
                        map: Data_1.getMapName(result.map_id),
                        archetype: Data_1.getArchetypeName(result.archetype_id),
                        level: result.level
                    };
                });
                resolve(previews);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    DBController.prototype.updateCharacter = function (data) {
        var name = data.name;
        return this._database.collection("characters").findOneAndUpdate({ name: name }, data);
    };
    DBController.PASSWORD_SIZE = 64;
    DBController.HASH_VALS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    DBController.tokenGen = new TokenGenerator_1.TokenGenerator(DBController.PASSWORD_SIZE);
    return DBController;
}());
exports.DBController = DBController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvREJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQXdDO0FBQ3hDLHVDQUFnSTtBQUNoSSxxQ0FBNEQ7QUFDNUQsMERBQXlEO0FBRXpEO0lBT0ksc0JBQVksYUFBZ0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVjLGlCQUFJLEdBQW5CLFVBQW9CLEtBQVk7UUFDNUIsSUFBRyxLQUFLLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxhQUFhLEVBQUM7WUFDekMsSUFBSSxJQUFJLEdBQVUsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzVELE9BQU8sK0JBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFYyxpQkFBSSxHQUFuQixVQUFvQixLQUFZO1FBQzVCLElBQUksTUFBTSxHQUFZLElBQUksS0FBSyxDQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxLQUFJLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN6QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FDOUIsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUM1RCxDQUFDO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLHdDQUFpQixHQUF6QjtR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