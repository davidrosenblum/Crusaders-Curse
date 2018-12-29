import * as express from "express";
import { DBController } from "../../database/DBController";
export declare class AccountCreateHandler {
    static createAccount(db: DBController, req: express.Request, res: express.Response): void;
}
