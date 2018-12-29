"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatHandler = /** @class */ (function () {
    function ChatHandler() {
    }
    ChatHandler.prototype.chatMessage = function (client, data) {
        if (!client.hasAccountData || !client.playerName) {
            client.send(10 /* CHAT_MESSAGE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.chat, chat = _a === void 0 ? null : _a;
        if (typeof chat === "string") {
            if (chat.charAt(0) === "~" && client.accessLevel > 1) {
                this.adminCommand(client, chat);
            }
            else {
                client.player.map.submitChat(chat, client.playerName);
            }
        }
    };
    ChatHandler.prototype.adminCommand = function (client, chat) {
    };
    return ChatHandler;
}());
exports.ChatHandler = ChatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdEhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZS9DaGF0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBQUE7SUFzQkEsQ0FBQztJQXJCVSxpQ0FBVyxHQUFsQixVQUFtQixNQUFpQixFQUFFLElBQVE7UUFDMUMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLHdCQUFzQiwyQkFBMkIsY0FBYSxDQUFDO1lBQzFFLE9BQU87U0FDVjtRQUVJLElBQUEsY0FBUyxFQUFULGdDQUFTLENBQVM7UUFFdkIsSUFBRyxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBQztnQkFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkM7aUJBQ0c7Z0JBQ0EsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekQ7U0FDSjtJQUNMLENBQUM7SUFFTyxrQ0FBWSxHQUFwQixVQUFxQixNQUFpQixFQUFFLElBQVc7SUFFbkQsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQXRCWSxrQ0FBVyJ9