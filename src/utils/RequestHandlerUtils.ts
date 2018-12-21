import * as express from "express";

export class RequestHandlerUtils{
    public static readPostBody(req:express.Request, callback:(err?:Error, json?:any)=>any):void{
        let data:string = "";

        req.on("data", chunk => data += chunk);

        req.on("end", () => {
            let json:any = null;

            try{
                json = JSON.parse(data);    
            }
            catch(err){
                callback(err, null);
            }

            callback(null, json);
        });
    }
}