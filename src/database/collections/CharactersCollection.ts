import { Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject } from "mongodb";
import { getMapName, getArchetypeName } from "../../data/Data";

export interface CharacterPreviewDocument{
    name:string;
    level:number;
    archetype:string;
    map:string;
}

export interface CharacterDocumentPotions{
    health:number,
    mana:number,
    rage:number,
    luck:number,
    protection:number;
}

export interface CharacterDocumentLastMap{
    map_id:number;
    x:number;
    y:number;
}

export interface CharacterDocument{
    account_id:string;
    name:string;
    level:number;
    xp:number;
    gold:number;
    ability_points:number;
    archetype_id:number;
    abilities: {[ability:string]: number},
    potions:CharacterDocumentPotions;
    last_map:CharacterDocumentLastMap;
    skin:number;
}

export class CharactersCollection{
    public static createCharacter(database:Db, accountID:string, archetypeID:number, name:string, skin:number=1):Promise<string>{
        return new Promise((resolve, reject) => {
            let characterDoc:CharacterDocument = {
                account_id: accountID,
                name,
                archetype_id: archetypeID,
                level: 1,
                xp: 0,
                gold: 0,
                ability_points: 0,
                skin,
                abilities: {},
                potions: {health: 0, mana: 0, rage: 0, luck: 0, protection: 0},
                last_map: {map_id: 1, x: -1, y:-1}
            };
    
            database.collection("characters").insertOne(characterDoc)
                .then(result => {
                    if(result.insertedCount > 0){
                        resolve(`Character "${name}" created.`);
                    }
                    else reject(new Error("Character not created."));
                })
                .catch(err => reject(err));
        });
    }

    public static deleteCharacter(database:Db, accountID:string, name:string):Promise<string>{
        return new Promise((resolve, reject) => {
            database.collection("characters").deleteOne({account_id: accountID, name})
                .then(report => {
                    if(report.deletedCount > 0){
                        resolve(`Charater "${name}" deleted.`);
                    }
                    else reject(new Error("Character not deleted."));
                })
                .catch(err => reject(err));
        });
    }

    public static getCharacter(database:Db, accountID:string, name:string):Promise<CharacterDocument>{
        return new Promise((resolve, reject) => {
            database.collection("characters").findOne({account_id: accountID, name})
                .then(data => {
                    if(data){
                        resolve(data as CharacterDocument);
                    }
                    else reject(new Error(`Character ${name} not found.`));
                })
                .catch(err => reject(err));
        });
    }

    public static getCharacterList(database:Db, accountID:string):Promise<CharacterPreviewDocument[]>{
        return new Promise((resolve, reject) => {
            database.collection("characters").find({account_id: accountID}).toArray()
                .then(characters => {
                    let previews:CharacterPreviewDocument[] = new Array<CharacterPreviewDocument>(characters.length);

                    characters.forEach((character, index) => {
                        let doc:CharacterDocument = character;
    
                        previews[index] = {
                            archetype:  getArchetypeName(doc.archetype_id),
                            map:        getMapName(doc.last_map.map_id), 
                            name:       doc.name,
                            level:      doc.level
                        };
                    });

                    resolve(previews);
                })
                .catch(err => reject(err));
        });
    }

    public static updateCharacter(database:Db, data:CharacterDocument):Promise<FindAndModifyWriteOpResultObject>{
        let name:string = data.name;
        return database.collection("characters").findOneAndUpdate({name}, data);
    }
}