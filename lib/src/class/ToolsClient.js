"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsHub = void 0;
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = require("mongoose");
const node_perf_hooks_1 = require("node:perf_hooks");
const CrashUtils_1 = require("../modules/CrashUtils");
const LoggerUtils_1 = require("../modules/LoggerUtils");
class ToolsHub {
    constructor(database, weebhook, path, client) {
        this.database = database;
        this.weebhook = weebhook;
        this.client = client;
        this.path = path;
        this.start();
    }
    async start() {
        await (0, CrashUtils_1.CrashUtils)({ client: this.client, webhookUrl: this.weebhook, path: this.path });
        this.MongoConnect();
    }
    /**
     * The function `mongodb` connects to a MongoDB database asynchronously and throws an error if there is
     * a connection issue.
     */
    async MongoConnect() {
        try {
            const startTime = node_perf_hooks_1.performance.now();
            await (0, mongoose_1.connect)(this.database);
            const endTime = node_perf_hooks_1.performance.now();
            (0, LoggerUtils_1.logWithLabel)('custom', `Database connection took ${endTime - startTime}ms.`, 'Eternal');
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
    async LicenceUtil(body) {
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
//# sourceMappingURL=ToolsClient.js.map