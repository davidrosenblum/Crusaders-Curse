export class TokenGenerator{
    private static VALS:string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

    private _tokenSize:number;
    private _tokens:{[token:string]: boolean};

    constructor(tokenSize:number=16){    
        this._tokenSize = tokenSize;
        this._tokens = {};
    }

    public static anyToken(size:number):string{
        let buffer:string[] = new Array<string>(size);

        for(let i:number = 0; i < size; i++){
            buffer[i] = TokenGenerator.VALS[
                Math.round(Math.random() * TokenGenerator.VALS.length)
            ];
        }

        return buffer.join("");
    }

    public nextToken():string{
        let token:string = null;

        do{
            token = TokenGenerator.anyToken(this.tokenSize);
        } while(this.hasToken(token))

        this._tokens[token] = true;

        return token;
    }

    public releaseToken(token:string):boolean{
        return delete this._tokens[token];
    }

    public hasToken(token:string):boolean{
        return token in this._tokens;
    }

    public get tokenSize():number{
        return this._tokenSize;
    }
}