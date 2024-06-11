import { Client, Events } from "discord.js";
export declare class DiscordLogger {
    private events;
    private channel;
    private client;
    constructor(channel: string, events: Array<keyof typeof Events>, client: Client);
    private init;
}
