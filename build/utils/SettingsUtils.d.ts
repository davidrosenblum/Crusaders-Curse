export interface SettingsConfig {
    mongo_database: {
        uri: string;
        database_name: string;
    };
    server: {
        port: number;
    };
    game: {
        double_xp: boolean;
    };
}
export declare class SettingsUtils {
    static readonly PATH: string;
    private static DEFAULTS;
    static load(): Promise<SettingsConfig>;
    static writeDefault(): Promise<SettingsConfig>;
}
