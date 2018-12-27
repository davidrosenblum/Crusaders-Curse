import * as fw from "@davidrosenblum/frostwork";

export const MapTileTypes = [
    GrassTile
];

export class GrassTile extends fw.Sprite{
    constructor(){
        super(null, 64, 64);
    }
}