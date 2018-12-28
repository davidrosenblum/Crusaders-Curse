import { EventEmitter } from "events";
import { TokenGenerator } from "../utils/TokenGenerator";
import { Team } from "../data/Data";

export interface GameObjectConfig{
    team?:Team;
    ownerID?:string;
    name:string;
    type:string;
    x?:number;
    y?:number;
    anim?:string;
    facing?:Facing;
    moveSpeed?:number;
    spawnCoords?:SpawnCoordinates;
}

export interface GameObjectState{ // update data
    x?:number;
    y?:number;
    anim?:string;
    facing?:Facing;
    moveSpeed?:number;
    stunned?:boolean;
    objectID:string;
}

export interface GameObjectFullState{ // spawn data
    objectID:string;
    ownerID:string;
    team:Team;
    name:string;
    type:string;
    x:number;
    y:number;
    anim:string;
    facing:Facing;
    moveSpeed:number;
    stunned:boolean;
    spawnCoords:SpawnCoordinates;
}

export interface SpawnCoordinates{
    row:number;
    col:number;
}

export const enum Facing{
    UP =    "up",
    DOWN =  "down",
    LEFT =  "left",
    RIGHT = "right"
}

export abstract class GameObject extends EventEmitter{
    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _objectID:string;
    private _ownerID:string;
    private _team:Team;
    private _type:string;
    private _name:string;
    private _x:number;
    private _y:number;
    private _anim:string;
    private _facing:Facing;
    private _moveSpeed:number;
    private _stunned:boolean;
    private _spawnCoords:SpawnCoordinates;

    constructor(config:GameObjectConfig){
        super();

        this._objectID = GameObject.tokenGen.nextToken();
        this._ownerID = config.ownerID || null;
        this._name = config.name;
        this._type = config.type;
        this.x = config.x;
        this.y = config.y;
        this.team = config.team || null;
        this.anim = config.anim || null;
        this.facing = config.facing || Facing.DOWN;
        this.moveSpeed = 1;
        this.isStunned = false;
        this._spawnCoords = config.spawnCoords ? {row: config.spawnCoords.row || 0, col: config.spawnCoords.col || 0} : null;
    }

    public inRange(target:GameObject, range:number):boolean{
        if(target.x < this.x + range && this.x < target.x + range){
            if(target.y < this.y + range && this.y < target.y + range){
                return true;
            }
        }
        return false;
    }

    public setState(state:GameObjectState):void{
        let {
            x=this.x,
            y=this.y,
            anim=this.anim,
            facing=this.facing,
            moveSpeed=this.moveSpeed,
            stunned=this.isStunned
        } = state;

        this._x = x;
        this._y = y;
        this._anim = anim;
        this._facing = facing;
        this._moveSpeed = moveSpeed;
        this._stunned = stunned;

        this.emit("update");
    }

    public getState():GameObjectFullState{
        return {
            objectID:       this.objectID,
            ownerID:        this.ownerID,
            team:           this.team,
            name:           this.name,
            type:           this.type,
            x:              this.x,
            y:              this.y,
            anim:           this.anim,
            facing:         this.facing,
            moveSpeed:      this.moveSpeed,
            stunned:        this.isStunned,
            spawnCoords:    this._spawnCoords
        };
    }

    public set team(value:Team){
        this._team = value;
    }

    public set x(x:number){
        this._x = x;
        this.emit("update", {x});
    }

    public set y(y:number){
        this._y = y;
        this.emit("update", {y});
    }

    public set anim(anim:string){
        this._anim = anim;
        this.emit("update", {anim});
    }

    public set facing(facing:Facing){
        this._facing = facing;
        this.emit("update", {facing});
    }

    public set moveSpeed(moveSpeed:number){
        this._moveSpeed = Math.abs(moveSpeed);
        this.emit("update", {moveSpeed});
    }

    public set isStunned(stunned:boolean){
        this._stunned = stunned;
        this.emit("update", {stunned});
    }

    public get objectID():string{
        return this._objectID;
    }

    public get ownerID():string{
        return this._ownerID;
    }

    public get team():Team{
        return this._team;
    }

    public get name():string{
        return this._name;
    }

    public get type():string{
        return this._type;
    }

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }

    public get anim():string{
        return this._anim;
    }

    public get facing():Facing{
        return this._facing;
    }

    public get moveSpeed():number{
        return this._moveSpeed;
    }

    public get isStunned():boolean{
        return this._stunned;
    }
}