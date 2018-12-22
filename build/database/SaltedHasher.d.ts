export declare class SaltedHasher {
    private static readonly HASH_VALS;
    private _passwordSize;
    constructor(passwordSize: number);
    salt(input: string): string;
    hash(input: string): string;
    readonly passwordSize: number;
}
