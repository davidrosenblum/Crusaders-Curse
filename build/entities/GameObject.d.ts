/// <reference types="node" />
import { EventEmitter } from "events";
import { Team } from "../data/Data";
export interface GameObjectConfig {
    team?: Team;
    ownerID?: string;
    name: string;
    type: string;
    x?: number;
    y?: number;
    anim?: string;
    facing?: Facing;
    moveSpeed?: number;
    spawnCoords?: SpawnCoordinates;
}
export interface GameObjectState {
    x?: number;
    y?: number;
    anim?: string;
    facing?: Facing;
    moveSpeed?: number;
    stunned?: boolean;
    objectID: string;
}
export interface GameObjectFullState {
    objectID: string;
    ownerID: string;
    team: Team;
    name: string;
    type: string;
    x: number;
    y: number;
    anim: string;
    facing: Facing;
    moveSpeed: number;
    stunned: boolean;
    spawnCoords: SpawnCoordinates;
}
export interface SpawnCoordinates {
    row: number;
    col: number;
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
    private _ownerID;
    private _team;
    private _type;
    private _name;
    private _x;
    private _y;
    private _anim;
    private _facing;
    private _moveSpeed;
    private _stunned;
    private _spawnCoords;
    constructor(config: GameObjectConfig);
    inRange(target: GameObject, range: number): boolean;
    setState(state: GameObjectState): void;
    getState(): GameObjectFullState;
    team: Team;
    x: number;
    y: number;
    anim: string;
    facing: Facing;
    moveSpeed: number;
    isStunned: boolean;
    readonly objectID: string;
    readonly ownerID: string;
    readonly name: string;
    readonly type: string;
}
