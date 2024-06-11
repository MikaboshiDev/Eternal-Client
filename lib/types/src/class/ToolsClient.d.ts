import { Client } from "discord.js";
import { Data } from "../types/tools/TypesTools";
export declare class ToolsHub {
    private database;
    private weebhook;
    private client;
    private path;
    constructor(database: string, weebhook: string, path: string, client: Client);
    private start;
    /**
     * The function `mongodb` connects to a MongoDB database asynchronously and throws an error if there is
     * a connection issue.
     */
    private MongoConnect;
    /**
     * The function sends a POST request to a specified API endpoint with license and product information,
     * and returns the response data if successful.
     * @param {Data} body - The `licences` function takes a `Data` object as its parameter. The `Data`
     * object typically contains the following properties:
     * @returns If the `res.data` object has a `status_overview` property that is not equal to 'success' or
     * a `status_code` property that is not equal to 200, the function will return `false`. Otherwise, it
     * will return the `res.data` object.
     */
    LicenceUtil(body: Data): Promise<any>;
}
