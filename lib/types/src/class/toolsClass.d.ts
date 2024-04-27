import { Client } from 'discord.js';
export declare class toolsHub {
    database: string;
    urlLicence: string;
    clientDC: Client;
    constructor(database: string, urlLicence: string, clientDC: Client);
    private start;
    private DB;
    getLicence(API_KEY: string, version: string, product: string, licence: string): Promise<any>;
}
