"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function resolve(params) {
    return (0, node_fetch_1.default)(`https://akaneko.cuteasfubuki.xyz/api/${params}`)
        .then((res) => res.json())
        .then((json) => {
        return json.url;
    });
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map