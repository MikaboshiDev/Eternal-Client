"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContent = void 0;
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
exports.getContent = getContent;
//# sourceMappingURL=nekos.life.js.map