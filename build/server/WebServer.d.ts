export declare class WebServer {
    private _httpServer;
    private _wsServer;
    private _app;
    private _settings;
    private _database;
    private _clients;
    constructor();
    private onWebSocket;
    private handlClientRequest;
    private createRoutes;
    private init;
}
