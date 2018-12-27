import * as fw from "@davidrosenblum/frostwork";

export class TransportNodeFactory{
    static create(type, text, outMapID, outRow, outCol){
        switch(type){
            case "airship":
                return new TransportNode(null, 100, 100, text, outMapID, outRow, outCol);
            case "portal":
                return new TransportNode(null, 100, 100, text, outMapID, outRow, outCol);
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