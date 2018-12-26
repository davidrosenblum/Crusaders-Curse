/// <reference types="node" />
import { EventEmitter } from "events";
import { CasterObject } from "../entities/CasterObject";
export interface AbilityConfig {
    level: number;
    manaCost: number;
    recharge: number;
    range?: number;
    maxTargets?: number;
    alwaysHit?: boolean;
}
export declare abstract class Ability extends EventEmitter {
    static readonly UPGRADE_LEVEL_CAP: number;
    private _level;
    private _manaCost;
    private _recharge;
    private _range;
    private _maxTargets;
    private _alwaysHit;
    private _ready;
    constructor(config: AbilityConfig);
    cast(caster: CasterObject, target: CasterObject, targets: CasterObject[]): boolean;
    validateAlliesOnly(caster: CasterObject, target: CasterObject): boolean;
    validateAlliesAndSelf(caster: CasterObject, target: CasterObject): boolean;
    validateEnemiesOnly(caster: CasterObject, target: CasterObject): boolean;
    abstract validateTarget(caster: CasterObject, target: CasterObject): boolean;
    abstract effect(target: CasterObject): boolean;
    abstract upgrade(): boolean;
    abstract readonly name: string;
    readonly level: number;
    readonly manaCost: number;
    readonly recharge: number;
    readonly range: number;
    readonly maxTargets: number;
    readonly alwaysHit: boolean;
    readonly isReady: boolean;
}
