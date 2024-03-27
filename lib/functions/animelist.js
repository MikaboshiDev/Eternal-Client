"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaRecommended = exports.animeRecommended = exports.animeSearch = exports.mangaSearch = exports.mangaRandom = exports.animeRandom = void 0;
const axios_1 = __importDefault(require("axios"));
const apis = {
    animes: {
        recommended: 'https://api.jikan.moe/v4/recommendations/anime',
        random: 'https://api.jikan.moe/v4/random/anime',
        search: 'https://api.jikan.moe/v4/anime/',
    },
    manga: {
        recommended: 'https://api.jikan.moe/v4/recommendations/manga',
        random: 'https://api.jikan.moe/v4/random/manga',
        search: 'https://api.jikan.moe/v4/manga/',
    },
};
async function animeRandom() {
    const response = await axios_1.default.get(apis.animes.random);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeRandom = animeRandom;
async function mangaRandom() {
    const response = await axios_1.default.get(apis.manga.random);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaRandom = mangaRandom;
async function mangaSearch(id) {
    const response = await axios_1.default.get(`${apis.manga.search}${id}/full`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaSearch = mangaSearch;
async function animeSearch(id) {
    const response = await axios_1.default.get(`${apis.animes.search}${id}/full`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeSearch = animeSearch;
async function animeRecommended() {
    const response = await axios_1.default.get(`${apis.animes.recommended}`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.animeRecommended = animeRecommended;
async function mangaRecommended() {
    const response = await axios_1.default.get(`${apis.manga.recommended}`);
    if (response.status !== 200)
        return false;
    return response.data;
}
exports.mangaRecommended = mangaRecommended;
//# sourceMappingURL=animelist.js.map