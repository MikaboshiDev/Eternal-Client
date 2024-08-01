import { Client } from "discord.js";
export declare class Tools {
    private database;
    private weebhook;
    private client;
    private path;
    constructor(database: string, weebhook: string, path: string, client: Client);
    private start;
    private mongo;
}
