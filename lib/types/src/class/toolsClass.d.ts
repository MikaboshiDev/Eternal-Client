import { Client } from 'discord.js';
export declare class toolsHub {
    databaseUrl: string;
    licenceUrl: string;
    apiUrl: string;
    client: Client;
    constructor(databaseUrl: string, licenceUrl: string, apiUrl: string, client: Client);
    private start;
    private DB;
    getLicence(API_KEY: string, version: string, product: string, licence: string): Promise<any>;
}
