import { Db, InsertOneWriteOpResult } from "mongodb";

export interface SaltDocument{
    username:string;
    salt:string;
}

export class SaltsCollection{
    public static storeSalt(database:Db, username:string, salt:string):Promise<InsertOneWriteOpResult>{
        let saltDoc:SaltDocument = {username, salt};

        return database.collection("salts").insertOne(saltDoc);
    }

    public static getSalt(database:Db, username:string):Promise<SaltDocument>{
        return new Promise((resolve, reject) => {
            database.collection("salts").findOne({username})
                .then(result => result ? resolve(result) : reject(new Error("Salt not found.")))
                .catch(err => reject(err));
        });
    }
}