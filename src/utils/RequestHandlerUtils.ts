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
                return;
            }

            callback(null, json);
        });
    }

    public static getCORSHeader(origin:string="*"):{[header:string]: string}{
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
        };
    }
}