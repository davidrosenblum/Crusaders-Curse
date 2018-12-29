import * as fw from "@davidrosenblum/frostwork";
import silverImg from "../img/silver.png";

export class TransportNodeFactory{
    static create(options){
        let {type, text, outMapID, outRow, outCol} = options;

        switch(type){
            case "airship":
                return new TransportNode(fw.AssetUtils.getImageURLByAlias("silver"), 100, 100, text, outMapID, outRow, outCol);
            case "portal":
                return new TransportNode(fw.AssetUtils.getImageURLByAlias("silver"), 100, 100, text, outMapID, outRow, outCol);
            default:
                return null;
        }
    }
}

export class TransportNode extends fw.GameEntity{
    constructor(image, width, height, text, outMapID, outRow, outCol){
        super(image, width, height);

        this.setNametag(text);

        this.outMapID = outMapID;
        this.outRow = outRow;
        this.outCol = outCol;
    }
}

fw.AssetUtils.setImageAliasMany({
    "silver": silverImg
});