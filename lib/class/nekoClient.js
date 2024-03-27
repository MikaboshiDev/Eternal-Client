"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekoClient = void 0;
const nekos_life_1 = require("../functions/nekos.life");
const endpoints_json_1 = __importDefault(require("../config/endpoints.json"));
/* The NekoClient class is designed to dynamically create methods for accessing various endpoints from
the nekos.life API. */
class NekoClient {
    constructor() {
        let self = this;
        let baseURL = 'https://nekos.life/api/v2';
        Object.keys(endpoints_json_1.default).forEach(async (endpoint) => {
            self[endpoint] = async function (queryParams = '') {
                let url = new URL(`${baseURL}${endpoints_json_1.default[endpoint]}`);
                queryParams !== '' ? (url.search = new URLSearchParams(queryParams).toString()) : '';
                return await (0, nekos_life_1.getContent)(url.toString());
            };
        });
    }
}
exports.NekoClient = NekoClient;
//# sourceMappingURL=nekoClient.js.map