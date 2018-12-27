import { MapType } from "../data/Data";
export interface TransportNodeFullState {
    nodeID: string;
    type: string;
    text: string;
    row: number;
    col: number;
    outMapID: number;
    outRow: number;
    outCol: number;
}
export declare const enum TransportNodeType {
    AIRSHIP = "airship",
    PORTAL = "portal"
}
export declare class TransportNode {
    private static tokenGen;
    private _nodeID;
    private _type;
    private _text;
    private _row;
    private _col;
    private _outMapID;
    private _outRow;
    private _outCol;
    constructor(type: TransportNodeType, text: string, row: number, col: number, outMapID: MapType, outRow: number, outCol: number);
    getState(): TransportNodeFullState;
    readonly nodeID: string;
    readonly type: TransportNodeType;
    readonly text: string;
    readonly row: number;
    readonly col: number;
    readonly outMapID: MapType;
    readonly outRow: number;
    readonly outCol: number;
}
