"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * This TypeScript function uses axios to fetch an image URL from a specific API endpoint based on the
 * provided parameter.
 * @param {string} params - The `params` variable in the `resolve` function is a string that represents
 * the specific endpoint or resource you want to fetch from the Akaneko API. It is used to construct
 * the URL for the API request.
 * @returns The `resolve` function is returning a Promise that resolves to a string. The string being
 * returned is the URL of an image fetched from the `https://akaneko.cuteasfubuki.xyz/api/` endpoint
 * based on the `params` provided to the function.
 */
async function resolve(params) {
    const response = await axios_1.default.get(`https://akaneko.cuteasfubuki.xyz/api/${params}`);
    if (!response || response.status !== 200)
        return;
    return response.data.url;
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map