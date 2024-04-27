"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsHub = void 0;
const console_1 = require("../tools/console");
const mongoose_1 = require("mongoose");
const axios_1 = __importDefault(require("axios"));
class toolsHub {
    constructor(database, urlLicence, clientDC) {
        this.database = database;
        this.urlLicence = urlLicence;
        this.clientDC = clientDC;
    }
    async DB() {
        try {
            const connection = await (0, mongoose_1.connect)(this.database);
            (0, console_1.logWithLabel)('database', [
                `Connected to the database: ${connection.connection.name}`,
                `Collections: ${connection.connection.collections}`,
                `State: ${connection.connection.readyState}`,
                `Host: ${connection.connection.host}`,
            ].join('\n'));
        }
        catch (error) {
            (0, console_1.logWithLabel)('error', `Error connecting to the database: ${error}`);
            console.error(error);
        }
    }
    async getLicence(API_KEY, version, product, licence) {
        try {
            const res = await (0, axios_1.default)({
                method: 'POST',
                url: this.urlLicence,
                data: {
                    licence: licence,
                    product: product,
                    version: version,
                },
                headers: {
                    Authorization: API_KEY,
                },
            });
            if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
                return false;
            }
            return res.data;
        }
        catch (error) {
            (0, console_1.logWithLabel)('error', `Error getting the licence: ${error}`);
            console.error(error);
        }
    }
}
exports.toolsHub = toolsHub;
//# sourceMappingURL=toolsClass.js.map