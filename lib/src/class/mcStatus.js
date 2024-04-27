"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcStatus = void 0;
const apis_json_1 = __importDefault(require("../../config/apis.json"));
const axios_1 = __importDefault(require("axios"));
class mcStatus {
    constructor(type, ip) {
        this.type = type;
        this.ip = ip;
    }
    async getStatus() {
        if (!['bedrock', 'java'].includes(this.type)) {
            throw new Error('Invalid type of Minecraft server provided.');
        }
        const res = await axios_1.default.get(`${apis_json_1.default.endpoints.mc[1]}/${this.type}/${this.ip}`);
        if (res.status !== 200)
            return false;
        return res.data;
    }
}
exports.mcStatus = mcStatus;
//# sourceMappingURL=mcStatus.js.map