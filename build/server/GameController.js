"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameClient_1 = require("./GameClient");
var AccountsHandler_1 = require("./gamehandlers/AccountsHandler");
var ChatHandler_1 = require("./gamehandlers/ChatHandler");
var CharactersHandler_1 = require("./gamehandlers/CharactersHandler");
var MapsHandler_1 = require("./gamehandlers/MapsHandler");
var AbilitiesHandler_1 = require("./gamehandlers/AbilitiesHandler");
var GameController = /** @class */ (function () {
    function GameController(database) {
        this._database = database;
        this._clients = {};
        this._numClients = 0;
        this._maps = new MapsHandler_1.MapsHandler(this._database);
        this._accounts = new AccountsHandler_1.AccountsHandler(this._database);
        this._characters = new CharactersHandler_1.CharactersHandler(this._database, this._maps);
        this._chat = new ChatHandler_1.ChatHandler();
        this._abilities = new AbilitiesHandler_1.AbilitiesHandler();
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
        conn.on("close", function () {
            console.log("Client-" + client.clientID + " disconnected.");
            _this.removeClient(client);
        });
    };
    GameController.prototype.removeClient = function (client) {
        if (delete this._clients[client.clientID]) {
            this._numClients--;
            if (client.hasAccountData) {
                this._accounts.logout(client);
            }
            if (client.player && client.player.map) {
                client.player.map.removeClient(client);
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
            case 13 /* OBJECT_UPDATE */:
                this._maps.updateUnit(client, data);
                break;
            case 14 /* OBJECT_STATS */:
                this._maps.getUnitStats(client, data);
                break;
            case 16 /* ABILITY_LIST */:
                this._abilities.getAbilities(client);
                break;
            case 17 /* ABILITY_CAST */:
                this._abilities.castAbility(client, data);
                break;
            case 18 /* ABILITY_PURCHASE */:
                this._abilities.purchaseAbility(client, data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFLN0Qsa0VBQWlFO0FBQ2pFLDBEQUF5RDtBQUN6RCxzRUFBcUU7QUFDckUsMERBQXlEO0FBQ3pELG9FQUFtRTtBQUVuRTtJQVVJLHdCQUFZLFFBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx5QkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx5QkFBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLHFDQUFZLEdBQW5CLFVBQW9CLElBQXlCO1FBQTdDLGlCQWtCQztRQWpCRyxJQUFJLE1BQU0sR0FBYyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLE1BQU0sQ0FBQyxRQUFRLGdCQUFhLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFBLElBQUk7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJ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