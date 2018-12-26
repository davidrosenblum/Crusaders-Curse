"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../../data/Data");
var CharactersCollection = /** @class */ (function () {
    function CharactersCollection() {
    }
    CharactersCollection.createCharacter = function (database, accountID, archetypeID, name, skin) {
        if (skin === void 0) { skin = 1; }
        return new Promise(function (resolve, reject) {
            var characterDoc = {
                account_id: accountID,
                name: name,
                archetype_id: archetypeID,
                level: 1,
                xp: 0,
                gold: 0,
                ability_points: 0,
                skin: skin,
                abilities: {},
                potions: { health: 0, mana: 0, rage: 0, luck: 0, protection: 0 },
                last_map: { map_id: 1, x: -1, y: -1 }
            };
            database.collection("characters").insertOne(characterDoc)
                .then(function (result) {
                if (result.insertedCount > 0) {
                    resolve("Character \"" + name + "\" created.");
                }
                else
                    reject(new Error("Character not created."));
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CharactersCollection.deleteCharacter = function (database, accountID, name) {
        return new Promise(function (resolve, reject) {
            database.collection("characters").deleteOne({ account_id: accountID, name: name })
                .then(function (report) {
                if (report.deletedCount > 0) {
                    resolve("Charater \"" + name + "\" deleted.");
                }
                else
                    reject(new Error("Character not deleted."));
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CharactersCollection.getCharacter = function (database, accountID, name) {
        return new Promise(function (resolve, reject) {
            database.collection("characters").findOne({ account_id: accountID, name: name })
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
    CharactersCollection.getCharacterList = function (database, accountID) {
        return new Promise(function (resolve, reject) {
            database.collection("characters").find({ account_id: accountID }).toArray()
                .then(function (characters) {
                var previews = new Array(characters.length);
                characters.forEach(function (character, index) {
                    var doc = character;
                    previews[index] = {
                        archetype: Data_1.getArchetypeName(doc.archetype_id),
                        map: Data_1.getMapName(doc.last_map.map_id),
                        name: doc.name,
                        level: doc.level
                    };
                });
                resolve(previews);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CharactersCollection.updateCharacter = function (database, data) {
        var name = data.name;
        return database.collection("characters").findOneAndUpdate({ name: name }, data);
    };
    return CharactersCollection;
}());
exports.CharactersCollection = CharactersCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyc0NvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJkYXRhYmFzZS9jb2xsZWN0aW9ucy9DaGFyYWN0ZXJzQ29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUErRDtBQXFDL0Q7SUFBQTtJQWlGQSxDQUFDO0lBaEZpQixvQ0FBZSxHQUE3QixVQUE4QixRQUFXLEVBQUUsU0FBZ0IsRUFBRSxXQUFrQixFQUFFLElBQVcsRUFBRSxJQUFhO1FBQWIscUJBQUEsRUFBQSxRQUFhO1FBQ3ZHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixJQUFJLFlBQVksR0FBcUI7Z0JBQ2pDLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixJQUFJLE1BQUE7Z0JBQ0osWUFBWSxFQUFFLFdBQVc7Z0JBQ3pCLEtBQUssRUFBRSxDQUFDO2dCQUNSLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxDQUFDO2dCQUNQLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLE1BQUE7Z0JBQ0osU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFDO2dCQUM5RCxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUM7YUFDckMsQ0FBQztZQUVGLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztpQkFDcEQsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDUixJQUFHLE1BQU0sQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFDO29CQUN4QixPQUFP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