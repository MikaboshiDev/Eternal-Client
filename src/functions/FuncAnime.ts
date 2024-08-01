import axios from "axios";

import url from "../../config/json/apis.json";
import { API } from "../types/tools/ToolsTypes";

// Function to create an API client with provided endpoints
const createAPIClient = (endpoints: API) => {
  return {
    // Method to get a random item from the API
    random: async () => {
      // Make a GET request to the random endpoint
      const response = await axios.get(endpoints.random);
      // If the response status is not 200 (OK), return false
      if (response.status !== 200) return false;
      // Otherwise, return the response
      return response;
    },
    // Method to search for an item by its ID
    search: async (id: number) => {
      // Make a GET request to the search endpoint with the provided ID
      const response = await axios.get(`${endpoints.search}${id}/full`);
      // If the response status is not 200 (OK), return false
      if (response.status !== 200) return false;
      // Otherwise, return the response
      return response;
    },
    // Method to get recommended items from the API
    recommended: async () => {
      // Make a GET request to the recommended endpoint
      const response = await axios.get(endpoints.recommended);
      // If the response status is not 200 (OK), return false
      if (response.status !== 200) return false;
      // Otherwise, return the response
      return response;
    },
  };
};

// Paths for anime and manga endpoints from a URL configuration
const animePath = url.endpoints.animes;
const mangaPath = url.endpoints.manga;

// Defining API endpoints for anime
const animeEndpoints: API = {
  random: animePath.random,
  search: animePath.search,
  recommended: animePath.recommended,
};

// Defining API endpoints for manga
const mangaEndpoints: API = {
  random: mangaPath.random,
  search: mangaPath.search,
  recommended: mangaPath.recommended,
};

// Creating API clients for anime and manga
const Anime = createAPIClient(animeEndpoints);
const Manga = createAPIClient(mangaEndpoints);

// Exporting the Anime and Manga API clients for use in other parts of the application
export { Anime, Manga };
