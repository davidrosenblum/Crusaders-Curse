import { CombatObject, CombatObjectConfig } from "./CombatObject";
export interface CasterObjectConfig extends CombatObjectConfig {
    spells?: number;
}
export declare abstract class CasterObject extends CombatObject {
    constructor(config: CasterObjectConfig);
}
