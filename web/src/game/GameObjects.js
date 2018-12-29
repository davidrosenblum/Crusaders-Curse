import * as fw from "@davidrosenblum/frostwork";
import blueImg from "../img/blue.png";
import darkBlueImg from "../img/darkblue.png";
import redImg from "../img/red.png";

export class Player extends fw.MPGameEntity{
    constructor(x, y, objectID, teamID){
        super(fw.AssetUtils.getImageURLByAlias("red"), 100, 100, x, y, objectID, teamID);
    }
}

export class Paragon extends fw.MPGameEntity{
    constructor(x, y, objectID, teamID){
        super(fw.AssetUtils.getImageURLByAlias("blue"), 100, 100, x, y, objectID, teamID);
    }
}

fw.AssetUtils.setImageAliasMany({
    "blue": blueImg,
    "darkblue": darkBlueImg,
    "red": redImg,
});

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