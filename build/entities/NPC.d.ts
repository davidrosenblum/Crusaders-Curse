import { CasterObject, CasterObjectConfig } from "./CasterObject";
import { Player } from "./Player";
export interface NPCConfig extends CasterObjectConfig {
    xpValue?: number;
    goldValue?: number;
}
export declare class NPC extends CasterObject {
    private _xpValue;
    private _goldValue;
    private _hasGivenBounty;
    constructor(config: NPCConfig);
    giveBounty(players: {
        [id: string]: Player;
    }): void;
    readonly xpValue: number;
    readonly goldValue: number;
}
