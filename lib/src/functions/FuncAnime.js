"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manga = exports.Anime = void 0;
const axios_1 = __importDefault(require("axios"));
const apis_json_1 = __importDefault(require("../../config/json/apis.json"));
// Function to create an API client with provided endpoints
const createAPIClient = (endpoints) => {
    return {
        // Method to get a random item from the API
        random: async () => {
            // Make a GET request to the random endpoint
            const response = await axios_1.default.get(endpoints.random);
            // If the response status is not 200 (OK), return false
            if (response.status !== 200)
                return false;
            // Otherwise, return the response
            return response;
        },
        // Method to search for an item by its ID
        search: async (id) => {
            // Make a GET request to the search endpoint with the provided ID
            const response = await axios_1.default.get(`${endpoints.search}${id}/full`);
            // If the response status is not 200 (OK), return false
            if (response.status !== 200)
                return false;
            // Otherwise, return the response
            return response;
        },
        // Method to get recommended items from the API
        recommended: async () => {
            // Make a GET request to the recommended endpoint
            const response = await axios_1.default.get(endpoints.recommended);
            // If the response status is not 200 (OK), return false
            if (response.status !== 200)
                return false;
            // Otherwise, return the response
            return response;
        },
    };
};
// Paths for anime and manga endpoints from a URL configuration
const animePath = apis_json_1.default.endpoints.animes;
const mangaPath = apis_json_1.default.endpoints.manga;
// Defining API endpoints for anime
const animeEndpoints = {
    random: animePath.random,
    search: animePath.search,
    recommended: animePath.recommended,
};
// Defining API endpoints for manga
const mangaEndpoints = {
    random: mangaPath.random,
    search: mangaPath.search,
    recommended: mangaPath.recommended,
};
// Creating API clients for anime and manga
const Anime = createAPIClient(animeEndpoints);
exports.Anime = Anime;
const Manga = createAPIClient(mangaEndpoints);
exports.Manga = Manga;
//# sourceMappingURL=FuncAnime.js.map