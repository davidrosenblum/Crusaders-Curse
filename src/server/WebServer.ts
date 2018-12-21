import * as express from "express";
import * as websocket from "websocket";
import * as http from "http";
import * as https from "https";
import { MongoClient } from "mongodb";
import { SettingsUtils, SettingsConfig } from "../utils/SettingsUtils";
import { DBController } from "../database/DBController";
import { AccountCreateHandler } from './handlers/AccountCreateHandler';

export class WebServer{
    private _httpServer:http.Server;
    private _wsServer:websocket.server;
    private _app:express.Application;
    private _settings:SettingsConfig;
    private _database:DBController;

    constructor(){
        this._app = express().use(express.static(`${__dirname}/../../web/build/index.html`));
        this._httpServer = http.createServer(this._app);
        this._wsServer = new websocket.server({httpServer: this._httpServer});
        this._settings = null;
        this._database = null;

        this.createRoutes();
        this.init();
    }

    private createRoutes():void{
        this._app.get("/", (req, res) => res.sendFile("index.html"));

        this._app.post("/accounts/create", (req, res) => AccountCreateHandler.createAccount(this._database, req, res));
    }

    private async init():Promise<any>{
        try{
            console.log("Loading settings...");
            this._settings = await SettingsUtils.load();
            console.log("Settings loaded.\n");

            console.log("Connecting to database...");
            let mongoUri:string = process.env.MONGO_URI || this._settings.mongo_database.uri;
            let mongoDbName:string = process.env.MONGO_DB || this._settings.mongo_database.database_name;
            let mongoClient:MongoClient = await MongoClient.connect(mongoUri, {useNewUrlParser: true});
            this._database = new DBController(mongoClient.db(mongoDbName));
            console.log("Database connected.\n");

            console.log("Starting server...");
            let port:number = parseInt(process.env.PORT) || this._settings.server.port;
            await this._httpServer.listen(port);
            console.log(`Server listening on port ${port}.\n`);
        }
        catch(err){
            console.log(err.message);
            process.exit();
        }
    }
}

if(require.main === module){
    new WebServer();
}