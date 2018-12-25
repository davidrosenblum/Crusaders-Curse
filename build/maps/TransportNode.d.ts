import { MapType } from "../data/Data";
export interface TransportNodeFullState {
    nodeID: string;
    type: string;
    text: string;
    row: number;
    col: number;
    outMapID: number;
    outX: number;
    outY: number;
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
    private _outX;
    private _outY;
    constructor(type: TransportNodeType, text: string, row: number, col: number, outMapID: MapType, outX: number, outY: number);
    getState(): TransportNodeFullState;
    readonly nodeID: string;
    readonly type: TransportNodeType;
    readonly text: string;
    readonly row: number;
    readonly col: number;
    readonly outMapID: MapType;
    readonly outX: number;
    readonly outY: number;
}
