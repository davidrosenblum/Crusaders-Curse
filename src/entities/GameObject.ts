import { EventEmitter } from "events";
import { TokenGenerator } from "../utils/TokenGenerator";

export interface GameObjectConfig{
    teamID?:string;
    name:string;
    type:string;
    x?:number;
    y?:number;
    anim?:string;
    facing?:string;
    moveSpeed?:number;
}

export interface GameObjectState{
    x?:number;
    y?:number;
    anim?:string;
    facing?:string;
    moveSpeed?:number;
    stunned?:boolean;
}

export interface GameObjectFullState{
    objectID:string;
    teamID:string;
    name:string;
    type:string;
    x:number;
    y:number;
    anim:string;
    facing:string;
    moveSpeed:number;
    stunned:boolean;
}

export abstract class GameObject extends EventEmitter{
    private static tokenGen:TokenGenerator = new TokenGenerator(16);

    private _objectID:string;
    private _teamID:string;
    private _type:string;
    private _name:string;
    private _x:number;
    private _y:number;
    private _anim:string;
    private _facing:string;
    private _moveSpeed:number;
    private _stunned:boolean;

    constructor(config:GameObjectConfig){
        super();

        this._objectID = GameObject.tokenGen.nextToken();
        this._name = config.name;
        this._type = config.type;
        this.teamID = config.teamID || null;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.anim = config.anim || null;
        this.facing = config.facing || "right";
        this.moveSpeed = 1;
        this.isStunned = false;
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
            objectID:   this.objectID,
            teamID:     this.teamID,
            name:       this.name,
            type:       this.type,
            x:          this.x,
            y:          this.y,
            anim:       this.anim,
            facing:     this.facing,
            moveSpeed:   this.moveSpeed,
            stunned:    this.isStunned
        };
    }

    public set teamID(value:string){
        this._teamID = value;
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

    public set facing(facing:string){
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

    public get teamID():string{
        return this._teamID;
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

    public get facing():string{
        return this._facing;
    }

    public get moveSpeed():number{
        return this._moveSpeed;
    }

    public get isStunned():boolean{
        return this._stunned;
    }
}