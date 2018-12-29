import { GameClient } from "../GameClient";
export declare class Login {
    static readonly CLIENT_VERSION_REQUIRED: string;
    private _database;
    login(client: GameClient, data: any): void;
    logout(client: GameClient): void;
}
