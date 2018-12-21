import * as express from "express";
import { DBController } from "../../database/DBController";
import { RequestHandlerUtils } from "../../utils/RequestHandlerUtils";

export class AccountCreateHandler{
    public static createAccount(db:DBController, req:express.Request, res:express.Response):void{
        RequestHandlerUtils.readPostBody(req, (err, json) => {
            if(!err){
                let {username=null, password=null} = json;

                db.createAccount(username, password)
                    .then(response => {
                        res.writeHead(200);
                        res.end(response);
                    })
                    .catch(err => {
                        res.writeHead(400);
                        res.end(err.message);
                    });
            }
            else{
                res.writeHead(400);
                res.end(err.message);
            }
        });
    }
}