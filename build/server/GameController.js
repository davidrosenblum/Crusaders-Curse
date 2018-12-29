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