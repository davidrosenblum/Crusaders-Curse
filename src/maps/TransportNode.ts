import { TokenGenerator } from "../utils/TokenGenerator";
import { MapType } from "../data/Data";

export interface TransportNodeFullState{
    nodeID:string;
    type:string;
    text:string;
    row:number;
    col:number;
    outMapID:number;
    outRow:number;
    outCol:number;
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
    private _outRow:number;
    private _outCol:number;

    constructor(type:TransportNodeType, text:string, row:number, col:number, outMapID:MapType, outRow:number, outCol:number){
        this._nodeID = TransportNode.tokenGen.nextToken();
        this._type = type;
        this._text = text;
        this._row = row;
        this._col = col;
        this._outMapID = outMapID;
        this._outRow = outRow;
        this._outCol = outCol;
    }

    public getState():TransportNodeFullState{
        return {
            nodeID:     this.nodeID,
            type:       this.type,
            text:       this.text,
            row:        this.row,
            col:        this.col,
            outMapID:   this.outMapID,
            outRow:     this.outRow,
            outCol:     this.outCol
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

    public get outRow():number{
        return this._outRow;
    }

    public get outCol():number{
        return this._outCol;
    }
}