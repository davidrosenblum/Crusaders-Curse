"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
var AccountsHandler_1 = require("./gamehandlers/AccountsHandler");
var ChatHandler_1 = require("./gamehandlers/ChatHandler");
var CharactersHandler_1 = require("./gamehandlers/CharactersHandler");
var MapsHandler_1 = require("./gamehandlers/MapsHandler");
var GameController = /** @class */ (function () {
    function GameController(database) {
        this._database = database;
        this._clients = {};
        this._numClients = 0;
        this._maps = new MapsHandler_1.MapsHandler(this._database);
        this._accounts = new AccountsHandler_1.AccountsHandler(this._database);
        this._characters = new CharactersHandler_1.CharactersHandler(this._database, this._maps);
        this._chat = new ChatHandler_1.ChatHandler();
    }
    GameController.prototype.createClient = function (conn) {
        var _this = this;
        var client = new GameClient_1.GameClient(conn);
        console.log("Client-" + client.clientID + " connected.");
        conn.on("message", function (data) {
            console.log(data.utf8Data);
            GameClient_1.GameClient.parseRequests(client, data, _this.handlClientRequest.bind(_this));
        });
        conn.on("error", function (err) {
            // handle? 
            console.log(err.message);
        });
        conn.on("close", function () { return _this.removeClient(client); });
    };
    GameController.prototype.removeClient = function (client) {
        if (delete this._clients[client.clientID]) {
            this._numClients--;
            if (client.hasAccountData) {
                this._accounts.logout(client);
            }
        }
    };
    GameController.prototype.handlClientRequest = function (req) {
        var client = req.client, opCode = req.opCode, data = req.data;
        switch (opCode) {
            case 1 /* ACCOUNT_LOGIN */:
                this._accounts.login(client, data);
                break;
            case 2 /* ACCOUNT_LOGOUT */:
                this._accounts.logout(client);
                break;
            case 3 /* CHARACTER_LIST */:
                this._characters.getCharacters(client);
                break;
            case 4 /* CHARACTER_CREATE */:
                this._characters.createCharacter(client, data);
                break;
            case 6 /* CHARACTER_SELECT */:
                this._characters.selectCharacter(client, data);
                break;
            case 7 /* ENTER_MAP */:
                this._maps.enterMap(client, data);
                break;
            case 8 /* ENTER_INSTANCE */:
                this._maps.enterInstance(client, data);
                break;
            case 10 /* CHAT_MESSAGE */:
                this._chat.chatMessage(client, data);
                break;
            case 14 /* OBJECT_STATS */:
                this.processStats(client, data);
                break;
            default:
                client.send(99 /* INVALID_OPCODE */, "Invalid OpCode", 4 /* BAD */);
                break;
        }
    };
    GameController.prototype.processStats = function (client, data) {
        if (!client.hasAccountData || !client.player) {
            client.send(14 /* OBJECT_STATS */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.objectID, objectID = _a === void 0 ? null : _a;
        if (!objectID) {
            client.send(14 /* OBJECT_STATS */, "Invalid json request - missing objectID.", 4 /* BAD */);
            return;
        }
        var map = client.player.map;
        if (map) {
            var stats = client.player.map.getUnitStats(objectID);
            if (stats) {
                client.send(14 /* OBJECT_STATS */, stats, 2 /* GOOD */);
            }
            else {
                client.send(14 /* OBJECT_STATS */, "Invalid target ID.", 4 /* BAD */);
            }
        }
        else {
            client.send(14 /* OBJECT_STATS */, "You are not in a map.", 4 /* BAD */);
        }
    };
    Object.defineProperty(GameController.prototype, "numClients", {
        get: function () {
            return this._numClients;
        },
        enumerable: true,
        configurable: true
    });
    return GameController;
}());
exports.GameController = GameController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFLN0Qsa0VBQWlFO0FBQ2pFLDBEQUF5RDtBQUN6RCxzRUFBcUU7QUFDckUsMERBQXlEO0FBRXpEO0lBU0ksd0JBQVksUUFBcUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztJQUVuQyxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsSUFBeUI7UUFBN0MsaUJBZUM7UUFkRyxJQUFJLE1BQU0sR0FBYyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLE1BQU0sQ0FBQyxRQUFRLGdCQUFhLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFBLElBQUk7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsdUJBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUks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