export declare class SaltedHasher {
    private static readonly HASH_VALS;
    private _passwordSize;
    constructor(passwordSize: number);
    salt(input: string): string;
    readonly passwordSize: number;
    private static hash;
}
