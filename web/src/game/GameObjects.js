import * as fw from "@davidrosenblum/frostwork";

export class Player extends fw.MPGameEntity{
    constructor(x, y){
        super(null, 100, 100, x, y);
    }
}

export const getGameObjectType = function(type){
    switch(type){
        case "player":
            return Player;
        default:
            return null;
    }
};