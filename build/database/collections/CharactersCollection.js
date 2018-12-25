"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("../../data/Data");
var CharactersCollection = /** @class */ (function () {
    function CharactersCollection() {
    }
    CharactersCollection.createCharacter = function (database, accountID, archetypeID, name, skin) {
        if (skin === void 0) { skin = 1; }
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
        return database.collection("characters").insertOne(characterDoc);
    };
    CharactersCollection.deleteCharacter = function (database, accountID, name) {
        return database.collection("characters").deleteOne({ account_id: accountID, name: name });
    };
    CharactersCollection.getCharacter = function (database, accountID, name) {
        return new Promise(function (resolve, reject) {
            database.collection("characters").findOne({ accountID: accountID, name: name })
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
            database.collection("characters").find({ accountID: accountID }).toArray()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyc0NvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJkYXRhYmFzZS9jb2xsZWN0aW9ucy9DaGFyYWN0ZXJzQ29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUErRDtBQXFDL0Q7SUFBQTtJQStEQSxDQUFDO0lBOURpQixvQ0FBZSxHQUE3QixVQUE4QixRQUFXLEVBQUUsU0FBZ0IsRUFBRSxXQUFrQixFQUFFLElBQVcsRUFBRSxJQUFhO1FBQWIscUJBQUEsRUFBQSxRQUFhO1FBQ3ZHLElBQUksWUFBWSxHQUFxQjtZQUNqQyxVQUFVLEVBQUUsU0FBUztZQUNyQixJQUFJLE1BQUE7WUFDSixZQUFZLEVBQUUsV0FBVztZQUN6QixLQUFLLEVBQUUsQ0FBQztZQUNSLEVBQUUsRUFBRSxDQUFDO1lBQ0wsSUFBSSxFQUFFLENBQUM7WUFDUCxjQUFjLEVBQUUsQ0FBQztZQUNqQixJQUFJLE1BQUE7WUFDSixTQUFTLEVBQUUsRUFBRTtZQUNiLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBQztZQUM5RCxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUM7U0FDckMsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVhLG9DQUFlLEdBQTdCLFVBQThCLFFBQVcsRUFBRSxTQUFnQixFQUFFLElBQVc7UUFDcEUsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFYSxpQ0FBWSxHQUExQixVQUEyQixRQUFXLEVBQUUsU0FBZ0IsRUFBRSxJQUFXO1FBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsV0FBQSxFQUFFLElBQUksTUFBQSxFQUFDLENBQUM7aUJBQ3ZELElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sSUFBRyxJQUFJLEVBQUM7b0JBQ0osT0FBTyxDQUFDLElBQXlCLENBQUMsQ0FBQztpQkFDdEM7O29CQUNJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFhLElBQUksZ0JBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSxxQ0FBZ0IsR0FBOUIsVUFBK0IsUUFBVyxFQUFFLFNBQWdCO1FBQ3hELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsV0FBQSxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQ3hELElBQUksQ0FBQyxVQUFBLFVBQVU7Z0JBQ1osSUFBSSxRQUFRLEdBQThCLElBQUksS0FBSyxDQUEyQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpHLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUUsS0FBSztvQkFDaEMsSUFBSSxHQUFHLEdBQXFCLFNBQVMsQ0FBQztvQkFFdEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dCQUNkLFNBQVMsRUFBRyx1QkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO3dCQUM5QyxHQUFHLEVBQVMsaUJBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDM0MsSUFBSSxFQUFRLEdBQUcsQ0FBQyxJQUFJO3dCQUNwQixLQUFLLEVBQU8sR0FBRyxDQUFDLEtBQUs7cUJBQ3hCLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWEsb0NBQWUsR0FBN0IsVUFBOEIsUUFBVyxFQUFFLElBQXNCO1FBQzdELElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBL0RELElBK0RDO0FBL0RZLG9EQUFvQiJ9