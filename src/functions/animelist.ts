import apis from '../../config/apis.json';
import axios from 'axios';

const anime = {
  animeRandom: async function () {
    const response = await axios.get(apis.endpoints.animes.random);
    if (response.status !== 200) return false;
    return response;
  },
  animeSearch: async function (id: number) {
    const response = await axios.get(`${apis.endpoints.animes.search}${id}/full`);
    if (response.status !== 200) return false;
    return response;
  },
  animeRecommended: async function () {
    const response = await axios.get(`${apis.endpoints.animes.recommended}`);
    if (response.status !== 200) return false;
    return response;
  },
};

const manga = {
  mangaRandom: async function () {
    const response = await axios.get(apis.endpoints.manga.random);
    if (response.status !== 200) return false;
    return response;
  },
  mangaSearch: async function (id: number) {
    const response = await axios.get(`${apis.endpoints.manga.search}${id}/full`);
    if (response.status !== 200) return false;
    return response;
  },
  mangaRecommended: async function () {
    const response = await axios.get(`${apis.endpoints.manga.recommended}`);
    if (response.status !== 200) return false;
    return response;
  },
};

export { anime, manga };