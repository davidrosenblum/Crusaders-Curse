import * as express from "express";
export declare class RequestHandlerUtils {
    static readPostBody(req: express.Request, callback: (err?: Error, json?: any) => any): void;
    static getCORSHeader(origin?: string): {
        [header: string]: string;
    };
}
