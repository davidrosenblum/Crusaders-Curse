export declare class TokenGenerator {
    private static VALS;
    private _tokenSize;
    private _tokens;
    constructor(tokenSize?: number);
    static anyToken(size: number): string;
    nextToken(): string;
    releaseToken(token: string): boolean;
    hasToken(token: string): boolean;
    readonly tokenSize: number;
}
