"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaClient = exports.animeClient = void 0;
const apis_json_1 = __importDefault(require("../../config/json/apis.json"));
const axios_1 = __importDefault(require("axios"));
const request = async (url) => {
    try {
        const response = await axios_1.default.get(url);
        if (response.status !== 200)
            return false;
        return response;
    }
    catch (error) {
        console.error('Error occurred:', error);
        return false;
    }
};
const createAPIClient = (endpoints) => {
    return {
        random: async () => {
            const response = await request(endpoints.random);
            if (!response)
                return false;
            return response;
        },
        search: async (id) => {
            const response = await request(`${endpoints.search}/${id}`);
            if (!response)
                return false;
            return response;
        },
        recommended: async () => {
            const response = await request(endpoints.recommended);
            if (!response)
                return false;
            return response;
        },
    };
};
const animePath = apis_json_1.default.endpoints.animes;
const mangaPath = apis_json_1.default.endpoints.manga;
const animeEndpoints = {
    random: animePath.random,
    search: animePath.search,
    recommended: animePath.recommended,
};
const mangaEndpoints = {
    random: mangaPath.random,
    search: mangaPath.search,
    recommended: mangaPath.recommended,
};
const animeClient = createAPIClient(animeEndpoints);
exports.animeClient = animeClient;
const mangaClient = createAPIClient(mangaEndpoints);
exports.mangaClient = mangaClient;
//# sourceMappingURL=animelist.js.map