/// <reference types="node" />
import { EventEmitter } from "events";
export interface GameObjectConfig {
    teamID?: string;
    name: string;
    type: string;
    x?: number;
    y?: number;
    anim?: string;
    facing?: Facing;
    moveSpeed?: number;
}
export interface GameObjectState {
    x?: number;
    y?: number;
    anim?: string;
    facing?: Facing;
    moveSpeed?: number;
    stunned?: boolean;
}
export interface GameObjectFullState {
    objectID: string;
    teamID: string;
    name: string;
    type: string;
    x: number;
    y: number;
    anim: string;
    facing: Facing;
    moveSpeed: number;
    stunned: boolean;
}
export declare const enum Facing {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export declare abstract class GameObject extends EventEmitter {
    private static tokenGen;
    private _objectID;
    private _teamID;
    private _type;
    private _name;
    private _x;
    private _y;
    private _anim;
    private _facing;
    private _moveSpeed;
    private _stunned;
    constructor(config: GameObjectConfig);
    setState(state: GameObjectState): void;
    getState(): GameObjectFullState;
    teamID: string;
    x: number;
    y: number;
    anim: string;
    facing: Facing;
    moveSpeed: number;
    isStunned: boolean;
    readonly objectID: string;
    readonly name: string;
    readonly type: string;
}
