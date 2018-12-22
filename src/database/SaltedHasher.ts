import { TokenGenerator } from "./../utils/TokenGenerator";

export class SaltedHasher{
    private static readonly HASH_VALS:string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    
    private _passwordSize:number;

    constructor(passwordSize:number){
        this._passwordSize = passwordSize;
    }

    public salt(input:string):string{
        if(input.length < this.passwordSize){
            let size:number = this.passwordSize - input.length;
            return TokenGenerator.anyToken(size);
        }
        return "";
    }

    public hash(input:string):string{
        let buffer:string[] = new Array<string>(input.length);

        for(let i:number = 0; i < buffer.length; i++){
            buffer[i] = SaltedHasher.HASH_VALS[
                (i + input.charCodeAt(i)) % SaltedHasher.HASH_VALS.length
            ];
        }

        return buffer.join("");
    }

    public get passwordSize():number{
        return this._passwordSize;
    }
}