"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekoClient = void 0;
const endpoints_json_1 = __importDefault(require("../config/endpoints.json"));
const url_1 = require("url");
const https_1 = require("https");
function getContent(url) {
    return new Promise((resolve, reject) => {
        (0, https_1.get)(url, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                res.resume();
                reject(`Request failed. Status code: ${statusCode}`);
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch (e) {
                    reject(`Error: ${e.message}`);
                }
            });
        }).on('error', (err) => {
            reject(`Error: ${err.message}`);
        });
    });
}
class NekoClient {
    constructor() {
        let self = this;
        let baseURL = 'https://nekos.life/api/v2';
        Object.keys(endpoints_json_1.default).forEach(async (endpoint) => {
            self[endpoint] = async function (queryParams = '') {
                let url = new url_1.URL(`${baseURL}${endpoints_json_1.default[endpoint]}`);
                queryParams !== '' ? (url.search = new url_1.URLSearchParams(queryParams).toString()) : '';
                return await getContent(url.toString());
            };
        });
    }
}
exports.NekoClient = NekoClient;
//# sourceMappingURL=nekos.life.js.map