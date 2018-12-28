import * as fw from "@davidrosenblum/frostwork";

export class Player extends fw.MPGameEntity{
    constructor(x, y, objectID, teamID){
        super(null, 100, 100, x, y, objectID, teamID);
    }
}

export class Paragon extends fw.MPGameEntity{
    constructor(x, y, objectID, teamID){
        super(null, 100, 100, x, y, objectID, teamID);
    }
}

export const getGameObjectType = function(type){
    switch(type){
        case "player":
            return Player;
        case "paragon":
            return Paragon;
        default:
            return null;
    }
};