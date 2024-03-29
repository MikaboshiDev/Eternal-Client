"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manga = exports.anime = void 0;
const apis_json_1 = __importDefault(require("../../config/apis.json"));
const axios_1 = __importDefault(require("axios"));
const anime = {
    animeRandom: async function () {
        const response = await axios_1.default.get(apis_json_1.default.endpoints.animes.random);
        if (response.status !== 200)
            return false;
        return response;
    },
    animeSearch: async function (id) {
        const response = await axios_1.default.get(`${apis_json_1.default.endpoints.animes.search}${id}/full`);
        if (response.status !== 200)
            return false;
        return response;
    },
    animeRecommended: async function () {
        const response = await axios_1.default.get(`${apis_json_1.default.endpoints.animes.recommended}`);
        if (response.status !== 200)
            return false;
        return response;
    },
};
exports.anime = anime;
const manga = {
    mangaRandom: async function () {
        const response = await axios_1.default.get(apis_json_1.default.endpoints.manga.random);
        if (response.status !== 200)
            return false;
        return response;
    },
    mangaSearch: async function (id) {
        const response = await axios_1.default.get(`${apis_json_1.default.endpoints.manga.search}${id}/full`);
        if (response.status !== 200)
            return false;
        return response;
    },
    mangaRecommended: async function () {
        const response = await axios_1.default.get(`${apis_json_1.default.endpoints.manga.recommended}`);
        if (response.status !== 200)
            return false;
        return response;
    },
};
exports.manga = manga;
//# sourceMappingURL=animelist.js.map