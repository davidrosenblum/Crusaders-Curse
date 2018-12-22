"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var websocket = require("websocket");
var http = require("http");
var mongodb_1 = require("mongodb");
var SettingsUtils_1 = require("../utils/SettingsUtils");
var DBController_1 = require("../database/DBController");
var RequestHandlerUtils_1 = require("../utils/RequestHandlerUtils");
var AccountCreateHandler_1 = require("./handlers/AccountCreateHandler");
var GameClient_1 = require("./GameClient");
var WebServer = /** @class */ (function () {
    function WebServer() {
        this._app = express().use(express.static(__dirname + "/../../web/build"));
        this._httpServer = http.createServer(this._app);
        this._wsServer = new websocket.server({ httpServer: this._httpServer });
        this._settings = null;
        this._database = null;
        this._clients = {};
        this._wsServer.on("request", this.onWebSocket.bind(this));
        this.createRoutes();
        this.init();
    }
    WebServer.prototype.onWebSocket = function (request) {
        var _this = this;
        var conn = request.accept(null, request.origin);
        var client = new GameClient_1.GameClient(conn);
        this._clients[client.clientID] = client;
        conn.on("message", function (data) {
            GameClient_1.GameClient.parseRequests(data, _this.handlClientRequest.bind(_this));
        });
        conn.on("error", function (err) {
            console.log(err.message);
        });
        conn.on("close", function () {
            delete _this._clients[client.clientID];
        });
    };
    WebServer.prototype.handlClientRequest = function (opCode, data) {
        // do stuff 
    };
    WebServer.prototype.createRoutes = function () {
        var _this = this;
        this._app.get("/", function (req, res) { return res.sendFile("index.html"); });
        this._app.options("/api*", function (req, res) {
            res.writeHead(204, RequestHandlerUtils_1.RequestHandlerUtils.getCORSHeader());
            res.end();
        });
        this._app.post("/api/accounts/create", function (req, res) {
            AccountCreateHandler_1.AccountCreateHandler.createAccount(_this._database, req, res);
        });
    };
    WebServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mongoUri, mongoDbName, mongoClient, port, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        console.log("Loading settings...");
                        _a = this;
                        return [4 /*yield*/, SettingsUtils_1.SettingsUtils.load()];
                    case 1:
                        _a._settings = _b.sent();
                        console.log("Settings loaded.\n");
                        console.log("Connecting to database...");
                        mongoUri = process.env.MONGO_URI || this._settings.mongo_database.uri;
                        mongoDbName = process.env.MONGO_DB || this._settings.mongo_database.database_name;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(mongoUri, { useNewUrlParser: true })];
                    case 2:
                        mongoClient = _b.sent();
                        this._database = new DBController_1.DBController(mongoClient.db(mongoDbName));
                        console.log("Database connected.\n");
                        console.log("Starting server...");
                        port = parseInt(process.env.PORT) || this._settings.server.port;
                        return [4 /*yield*/, this._httpServer.listen(port)];
                    case 3:
                        _b.sent();
                        console.log("Server listening on port " + port + ".\n");
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        console.log(err_1.message);
                        process.exit();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return WebServer;
}());
exports.WebServer = WebServer;
if (require.main === module) {
    new WebServer();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU2VydmVyLmpzIiwic291cmNlUm9vdCI6InNyYy8qKi8qLnRzLyIsInNvdXJjZXMiOlsic2VydmVyL1dlYlNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQW1DO0FBQ25DLHFDQUF1QztBQUN2QywyQkFBNkI7QUFFN0IsbUNBQXNDO0FBQ3RDLHdEQUF1RTtBQUN2RSx5REFBd0Q7QUFDeEQsb0VBQW1FO0FBQ25FLHdFQUF1RTtBQUN2RSwyQ0FBMEM7QUFHMUM7SUFRSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksU0FBUyxxQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTywrQkFBVyxHQUFuQixVQUFvQixPQUF5QjtRQUE3QyxpQkFpQkM7UUFoQkcsSUFBSSxJQUFJLEdBQXdCLE9BQU8sQ0FBQyxN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