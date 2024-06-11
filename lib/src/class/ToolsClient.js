"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsHub = void 0;
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importStar(require("mongoose"));
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
            const db = mongoose_1.default.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                (0, LoggerUtils_1.logWithLabel)('database', [
                    `${chalk_1.default.cyanBright('Database')} ${chalk_1.default.grey('connected')} ${chalk_1.default.grey(`${db.host}:${db.port}`)}`,
                    `  ➜  ${chalk_1.default.green('Database name')}: ${db.name}`,
                    `  ➜  ${chalk_1.default.green('Database state')}: 'connected'`,
                ].join('\n'));
            });
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