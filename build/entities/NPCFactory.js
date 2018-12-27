"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enforcer_1 = require("./npcs/Enforcer");
var Paragon_1 = require("./npcs/Paragon");
var NPCFactory = /** @class */ (function () {
    function NPCFactory() {
    }
    NPCFactory.createNPC = function (npcType, options) {
        if (options === void 0) { options = {}; }
        var row = options.row, col = options.col, anim = options.anim, name = options.name;
        switch (npcType) {
            case "paragon" /* PARAGON */:
                return new Paragon_1.Paragon(col, row, anim, name);
            case "enforcer" /* ENFORCER */:
                return new Enforcer_1.Enforcer(col, row, anim, name);
            default:
                return null;
        }
    };
    return NPCFactory;
}());
exports.NPCFactory = NPCFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTlBDRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvKiovKi50cy8iLCJzb3VyY2VzIjpbImVudGl0aWVzL05QQ0ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBMkM7QUFDM0MsMENBQXlDO0FBU3pDO0lBQUE7SUFhQSxDQUFDO0lBWmlCLG9CQUFTLEdBQXZCLFVBQXdCLE9BQWUsRUFBRSxPQUFxQjtRQUFyQix3QkFBQSxFQUFBLFlBQXFCO1FBQ3JELElBQUEsaUJBQUcsRUFBRSxpQkFBRyxFQUFFLG1CQUFJLEVBQUUsbUJBQUksQ0FBWTtRQUVyQyxRQUFPLE9BQU8sRUFBQztZQUNYO2dCQUNJLE9BQU8sSUFBSSxpQkFBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdDO2dCQUNJLE9BQU8sSUFBSSxtQkFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlDO2dCQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSxnQ0FBVSJ9