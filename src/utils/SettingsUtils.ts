import * as fs from "fs";

export interface SettingsConfig{
    mongo_database: {
        uri:string;
        database_name:string;
    },
    server: {
        port:number;
    },
    game: {
        double_xp:boolean;
    }
}

export class SettingsUtils{
    public static readonly PATH:string = "settings.json";

    private static DEFAULTS:SettingsConfig = {
        mongo_database: {
            uri: "mongodb://localhost:27017",
            database_name: "crusaders_curse"
        },
        server: {
            port: 8080
        },
        game: {
            double_xp: false
        }
    };

    public static load():Promise<SettingsConfig>{
        return new Promise((resolve, reject) => {
            fs.readFile(SettingsUtils.PATH, (err, data) => {
                if(!err){
                    let json:SettingsConfig = null;

                    try{
                        json = JSON.parse(data.toString());
                    }
                    catch(err){
                        reject(err);
                    }

                    resolve(json as SettingsConfig);
                }
                else if(err.errno === -4058){
                    SettingsUtils.writeDefault()
                        .then(settings => resolve(settings))
                        .catch(err => reject(err));
                }
                else reject(err);
            });
        });
    }

    public static writeDefault():Promise<SettingsConfig>{
        return new Promise((resolve, reject) => {
            fs.writeFile(SettingsUtils.PATH, JSON.stringify(SettingsUtils.DEFAULTS, null ,4), err => {
                err ? reject(err) : resolve(SettingsUtils.DEFAULTS)
            });
        });
    }
}