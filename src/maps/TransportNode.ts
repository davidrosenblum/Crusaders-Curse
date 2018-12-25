import { TokenGenerator } from "../utils/TokenGenerator";
import { MapType } from "../data/Data";

export interface TransportNodeFullState{
    nodeID:string;
    type:string;
    text:string;
    row:number;
    col:number;
    outMapID:number;
    outX:number;
    outY:number;
}

export const enum TransportNodeType{
    AIRSHIP =   "airship",
    PORTAL =    "portal"
}

export class TransportNode{
    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _nodeID:string;
    private _type:TransportNodeType;
    private _text:string;
    private _row:number;
    private _col:number;
    private _outMapID:number;
    private _outX:number;
    private _outY:number;

    constructor(type:TransportNodeType, text:string, row:number, col:number, outMapID:MapType, outX:number, outY:number){
        this._nodeID = TransportNode.tokenGen.nextToken();
        this._type = type;
        this._text = text;
        this._row = row;
        this._col = col;
        this._outMapID = outMapID;
        this._outX = outX;
        this._outY = outY;
    }

    public getState():TransportNodeFullState{
        return {
            nodeID:     this.nodeID,
            type:       this.type,
            text:       this.text,
            row:        this.row,
            col:        this.col,
            outMapID:   this.outMapID,
            outX:       this.outX,
            outY:       this.outY
        };
    }

    public get nodeID():string{
        return this._nodeID;
    }

    public get type():TransportNodeType{
        return this._type;
    }

    public get text():string{
        return this._text;
    }

    public get row():number{
        return this._row;
    }

    public get col():number{
        return this._col;
    }

    public get outMapID():MapType{
        return this._outMapID;
    }

    public get outX():number{
        return this._outX;
    }

    public get outY():number{
        return this._outY;
    }
}