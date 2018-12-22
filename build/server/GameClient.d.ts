import * as websocket from "websocket";
import { OpCode, Status } from "../data/Data";
import { AccountData } from "../database/AccountData";
import { Player } from "../entities/Player";
export interface ClientRequest {
    opCode: OpCode;
    data: any;
}
export declare class GameClient {
    static readonly MSG_DELIM: string;
    private static tokenGen;
    private _conn;
    private _clientID;
    private _accountData;
    player: Player;
    constructor(connection: websocket.connection);
    send(opCode: OpCode, data?: any, status?: Status): void;
    setAccountData(accountData: AccountData): void;
    readonly username: string;
    readonly hasAccountData: boolean;
    readonly clientID: string;
    static parseRequests(message: websocket.IMessage, handler: (req: ClientRequest) => any): void;
}
