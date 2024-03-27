"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const axios_1 = __importDefault(require("axios"));
async function resolve(params) {
    const response = await axios_1.default.get(`https://akaneko.cuteasfubuki.xyz/api/${params}`);
    if (response.status !== 200)
        throw new Error("Failed to fetch image");
    return response.data.url;
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map