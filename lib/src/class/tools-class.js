"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsHub = void 0;
const anti_crash_1 = require("../modules/anti-crash");
const mongoose_1 = require("mongoose");
const axios_1 = __importDefault(require("axios"));
class ToolsHub {
    constructor(database, weebhook, path, client) {
        this.database = database;
        this.weebhook = weebhook;
        this.client = client;
        this.path = path;
        this.start();
    }
    async start() {
        await (0, anti_crash_1.antiCrash)({ client: this.client, webhookUrl: this.weebhook, path: this.path });
        this.mongodb();
    }
    /**
     * The function `mongodb` connects to a MongoDB database asynchronously and throws an error if there is
     * a connection issue.
     */
    async mongodb() {
        try {
            await (0, mongoose_1.connect)(this.database);
        }
        catch (error) {
            throw new Error(`Error connecting to the database: ${error}`);
        }
    }
    /**
     * The function sends a POST request to a specified API endpoint with license and product information,
     * and returns the response data if successful.
     * @param {Data} body - The `licences` function takes a `Data` object as its parameter. The `Data`
     * object typically contains the following properties:
     * @returns If the `res.data` object has a `status_overview` property that is not equal to 'success' or
     * a `status_code` property that is not equal to 200, the function will return `false`. Otherwise, it
     * will return the `res.data` object.
     */
    async licences(body) {
        const res = await (0, axios_1.default)({
            method: 'POST',
            url: body.api,
            data: {
                licence: body.licence,
                product: body.product.name,
                version: body.product.version,
            },
            headers: {
                Authorization: body.key,
            },
        }).catch((e) => e);
        if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
            return false;
        }
        return res.data;
    }
}
exports.ToolsHub = ToolsHub;
//# sourceMappingURL=tools-class.js.map