import { CharacterDocument } from "../database/collections/CharactersCollection";
import { Player } from "./Player";
export declare class PlayerFactory {
    static restoreFromSave(saveData: CharacterDocument): Player;
    private static createKnight;
    private static createRanger;
    private static createMage;
}
