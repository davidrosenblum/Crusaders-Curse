import * as fw from "@davidrosenblum/frostwork";
import { TILE_SIZE } from './Game';
import grassImg from "../img/grass.png";

export class GrassTile extends fw.Sprite{
    constructor(){
        super(fw.AssetUtils.getImageURLByAlias("grass"), TILE_SIZE, TILE_SIZE);
    }
}

fw.AssetUtils.setImageAliasMany({
    "grass": grassImg
});

export const MapTileTypes = [
    null, GrassTile
];
