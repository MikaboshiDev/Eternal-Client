import { Client } from 'discord.js';
export declare class ApiTools {
    client: Client;
    url: string;
    constructor(url: string, client: Client);
    /**
     * The function `postAppWeb` is an asynchronous method in TypeScript that posts application web data
     * with validation checks.
     * @param  - The `postAppWeb` function is an asynchronous function that takes in the following
     * parameters:
     */
    postAppWeb({ description, iconURL, ownerId, licence, email, supportServer, }: {
        description: string;
        iconURL: string;
        ownerId: string;
        licence: string;
        email: string;
        supportServer: string;
    }): Promise<void>;
    /**
     * This TypeScript function makes an asynchronous GET request to retrieve application data based on the
     * provided ID.
     * @param  - It looks like you have a TypeScript method `getAppWeb` that takes an object with a `id`
     * property of type string as a parameter. The method makes a GET request using Axios to a specific URL
     * endpoint based on the provided `id`. If successful, it returns the response data, otherwise
     */
    getAppWeb({ id }: {
        id: string;
    }): Promise<void>;
    /**
     * This TypeScript function makes an asynchronous GET request to retrieve applications data from a
     * specified URL.
     */
    getAppsWeb(): Promise<void>;
}
