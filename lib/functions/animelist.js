"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaRecommended = exports.animeRecommended = exports.animeSearch = exports.mangaSearch = exports.mangaRandom = exports.animeRandom = void 0;
const axios_1 = __importDefault(require("axios"));
const apis_json_1 = __importDefault(require("../config/apis.json"));
async function animeRandom() {
    const response = await axios_1.default.get(apis_json_1.default.endpoints.animes.random);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeRandom = animeRandom;
async function mangaRandom() {
    const response = await axios_1.default.get(apis_json_1.default.endpoints.manga.random);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaRandom = mangaRandom;
async function mangaSearch(id) {
    const response = await axios_1.default.get(`${apis_json_1.default.endpoints.manga.search}${id}/full`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaSearch = mangaSearch;
async function animeSearch(id) {
    const response = await axios_1.default.get(`${apis_json_1.default.endpoints.animes.search}${id}/full`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeSearch = animeSearch;
async function animeRecommended() {
    const response = await axios_1.default.get(`${apis_json_1.default.endpoints.animes.recommended}`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeRecommended = animeRecommended;
async function mangaRecommended() {
    const response = await axios_1.default.get(`${apis_json_1.default.endpoints.manga.recommended}`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaRecommended = mangaRecommended;
//# sourceMappingURL=animelist.js.map