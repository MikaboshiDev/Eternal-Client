"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekoClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const endpoints_json_1 = __importDefault(require("../../config/json/endpoints.json"));
const nekos_1 = require("../libraries/nekos");
/* The NekoClient class is designed to dynamically create methods for accessing various endpoints from
the nekos.life API. */
class NekoClient {
    constructor() {
        const baseURL = 'https://nekos.life/api/v2';
        Object.keys(endpoints_json_1.default).forEach(async (endpoint) => {
            this[endpoint] = async function (queryParams = '') {
                const url = new URL(`${baseURL}${endpoints_json_1.default[endpoint]}`);
                queryParams !== '' ? (url.search = new URLSearchParams(queryParams).toString()) : '';
                return await (0, nekos_1.getContent)(url.toString());
            };
        });
    }
}
exports.NekoClient = NekoClient;
//# sourceMappingURL=neko-client.js.map