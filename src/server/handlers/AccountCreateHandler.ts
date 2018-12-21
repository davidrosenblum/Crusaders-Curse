import * as express from "express";
import { DBController } from "../../database/DBController";
import { RequestHandlerUtils } from "../../utils/RequestHandlerUtils";

export class AccountCreateHandler{
    public static createAccount(db:DBController, req:express.Request, res:express.Response):void{
        RequestHandlerUtils.readPostBody(req, (err, json) => {
            let headers:{[header:string]: string} = RequestHandlerUtils.getCORSHeader();

            if(!err){
                let {username=null, password=null} = json;

                if(username && password){
                    db.createAccount(username, password)
                        .then(response => {
                            res.writeHead(200, headers);
                            res.end(response);
                        })
                        .catch(err => {
                            res.writeHead(400, headers);
                            res.end(err.message);
                        });
                }
                else{
                    res.writeHead(400, headers);
                    res.end("Invalid json - username and password required."); 
                }
            }
            else{
                res.writeHead(400, headers);
                res.end(err.message);
            }
        });
    }
}