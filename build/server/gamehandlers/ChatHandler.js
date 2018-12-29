"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatHandler = /** @class */ (function () {
    function ChatHandler() {
    }
    ChatHandler.prototype.chatMessage = function (client, data) {
        if (!client.hasAccountData || !client.selectedName) {
            client.send(10 /* CHAT_MESSAGE */, "Account is not logged in.", 4 /* BAD */);
            return;
        }
        var _a = data.chat, chat = _a === void 0 ? null : _a;
        if (typeof chat === "string") {
            if (chat.charAt(0) === "~" && client.accessLevel > 1) {
                this.adminCommand(client, chat);
            }
            else {
                client.player.map.submitChat(chat, client.selectedName);
            }
        }
    };
    ChatHandler.prototype.adminCommand = function (client, chat) {
    };
    return ChatHandler;
}());
exports.ChatHandler = ChatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdEhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyoqLyoudHMvIiwic291cmNlcyI6WyJzZXJ2ZXIvZ2FtZWhhbmRsZXJzL0NoYXRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFBQTtJQXNCQSxDQUFDO0lBckJVLGlDQUFXLEdBQWxCLFVBQW1CLE1BQWlCLEVBQUUsSUFBUTtRQUMxQyxJQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUM7WUFDOUMsTUFBTSxDQUFDLElBQUksd0JBQXNCLDJCQUEyQixjQUFhLENBQUM7WUFDMUUsT0FBTztTQUNWO1FBRUksSUFBQSxjQUFTLEVBQVQsZ0NBQVMsQ0FBUztRQUV2QixJQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBQztZQUN4QixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFDO2dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuQztpQkFDRztnQkFDQSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzRDtTQUNKO0lBQ0wsQ0FBQztJQUVPLGtDQUFZLEdBQXBCLFVBQXFCLE1BQWlCLEVBQUUsSUFBVztJQUVuRCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLGtDQUFXIn0=