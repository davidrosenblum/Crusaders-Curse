export interface DBAccountSchema{
    accountID?:number;
    username:string;
    password:string;
    access_level:number;
    enabled:boolean;
    date_joined:number;
}

export interface DBSaltSchema{
    username:string;
    salt:string;
}