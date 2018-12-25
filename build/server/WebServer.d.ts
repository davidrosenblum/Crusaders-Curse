export declare class WebServer {
    private _httpServer;
    private _wsServer;
    private _app;
    private _settings;
    private _database;
    private _game;
    constructor();
    private onWebSocket;
    private createRoutes;
    private init;
}
