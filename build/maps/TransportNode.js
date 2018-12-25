"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenGenerator_1 = require("../utils/TokenGenerator");
var TransportNode = /** @class */ (function () {
    function TransportNode(type, text, row, col, outMapID, outX, outY) {
        this._nodeID = TransportNode.tokenGen.nextToken();
        this._type = type;
        this._text = text;
        this._row = row;
        this._col = col;
        this._outMapID = outMapID;
        this._outX = outX;
        this._outY = outY;
    }
    TransportNode.prototype.getState = function () {
        return {
            nodeID: this.nodeID,
            type: this.type,
            text: this.text,
            row: this.row,
            col: this.col,
            outMapID: this.outMapID,
            outX: this.outX,
            outY: this.outY
        };
    };
    Object.defineProperty(TransportNode.prototype, "nodeID", {
        get: function () {
            return this._nodeID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "row", {
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "col", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "outMapID", {
        get: function () {
            return this._outMapID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "outX", {
        get: function () {
            return this._outX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransportNode.prototype, "outY", {
        get: function () {
            return this._outY;
        },
        enumerable: true,
        configurable: true
    });
    TransportNode.tokenGen = new TokenGenerator_1.TokenGenerator(16);
    return TransportNode;
}());
exports.TransportNode = TransportNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNwb3J0Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbIm1hcHMvVHJhbnNwb3J0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF5RDtBQW1CekQ7SUFZSSx1QkFBWSxJQUFzQixFQUFFLElBQVcsRUFBRSxHQUFVLEVBQUUsR0FBVSxFQUFFLFFBQWdCLEVBQUUsSUFBVyxFQUFFLElBQVc7UUFDL0csSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxnQ0FBUSxHQUFmO1FBQ0ksT0FBTztZQUNILE1BQU0sRUFBTSxJQUFJLENBQUMsTUFBTTtZQUN2QixJQUFJLEVBQVEsSUFBSSxDQUFDLElBQUk7WUFDckIsSUFBSSxFQUFRLElBQUksQ0FBQyxJQUFJO1lBQ3JCLEdBQUcsRUFBUyxJQUFJLENBQUMsR0FBRztZQUNwQixHQUFHLEVBQVMsSUFBSSxDQUFDLEdBQUc7WUFDcEIsUUFBUSxFQUFJLElBQUksQ0FBQyxRQUFRO1lBQ3pCLElBQUksRUFBUSxJQUFJLENBQUMsSUFBSTtZQUNyQixJQUFJLEVBQVEsSUFBSSxDQUFDLElBQUk7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRCxzQkFBVyxpQ0FBTTthQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLCtCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQUc7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhCQUFHO2FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLCtCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBakVjLHNCQUFRLEdBQWtCLElBQUksK0JBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQWtFcEUsb0JBQUM7Q0FBQSxBQW5FRCxJQW1FQztBQW5FWSxzQ0FBYSJ9