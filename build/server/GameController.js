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
            case 14 /* OBJECT_STATS */:
                this._maps.getUnitStats(client, data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkQ7QUFLN0Qsa0VBQWlFO0FBQ2pFLDBEQUF5RDtBQUN6RCxzRUFBcUU7QUFDckUsMERBQXlEO0FBRXpEO0lBU0ksd0JBQVksUUFBcUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztJQUVuQyxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsSUFBeUI7UUFBN0MsaUJBa0JDO1FBakJHLElBQUksTUFBTSxHQUFjLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsTUFBTSxDQUFDLFFBQVEsZ0JBQWEsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUEsSUFBSTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQix1QkFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRztZQUNoQixXQUFXO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxNQUFNLENBQUMsUUFBUSxtQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsTUFBaUI7UUFDakMsSUFBRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixJQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDO2dCQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7U0FDSjtJQUNMLENBQUM7SUFFTywyQ0FBa0IsR0FBMUIsVUFBMkIsR0FBcUI7UUFDdkMsSUFBQSxtQkFBTSxFQUFFLG1CQUFNLEVBQUUsZUFBSSxDQUFRO1FBRWpDLFFBQU8sTUFBTSxFQUFDO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QztnQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLE1BQU07WUFDVjtnQkFDSSxNQUFNLENBQUMsSUFBSSwwQkFBd0IsZ0JBQWdCLGNBQWEsQ0FBQztnQkFDakUsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELHNCQUFXLHNDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBakdELElBaUdDO0FBakdZLHdDQUFjIn0=