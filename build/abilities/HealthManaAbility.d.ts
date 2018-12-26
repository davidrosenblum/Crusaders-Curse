import { Ability, AbilityConfig } from "./Ability";
import { CasterObject } from "../entities/CasterObject";
export interface HealthManaAbilityConfig extends AbilityConfig {
    healthPercent?: number;
    manaPercent?: number;
    ticks?: number;
}
export declare abstract class HealthManaAbility extends Ability {
    private _healPercent;
    private _manaPercent;
    private _ticks;
    constructor(config: HealthManaAbilityConfig);
    effect(target: CasterObject): boolean;
    private effectNoTicks;
    private effectWithTicks;
    readonly healthPercent: number;
    readonly manaPercent: number;
    readonly ticks: number;
}
