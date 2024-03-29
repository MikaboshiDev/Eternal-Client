import { Client } from 'discord.js';
export declare class Discord extends Client {
    constructor();
    start(token: string): Promise<void>;
}
