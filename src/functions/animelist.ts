import url from '../../config/json/apis.json';
import axios from 'axios';

type API = {
  random: string;
  search: string;
  recommended: string;
};


const createAPIClient = (endpoints: API) => {
  return {
    random: async () => {
      const response = await axios.get(endpoints.random);
      if (response.status !== 200) return false;
      return response;
    },
    search: async (id: number) => {
      const response = await axios.get(`${endpoints.search}${id}/full`);
      if (response.status !== 200) return false;
      return response;
    },
    recommended: async () => {
      const response = await axios.get(endpoints.recommended);
      if (response.status !== 200) return false;
      return response;
    },
  };
};

const animePath = url.endpoints.animes;
const mangaPath = url.endpoints.manga;

const animeEndpoints: API = {
  random: animePath.random,
  search: animePath.search,
  recommended: animePath.recommended,
};

const mangaEndpoints: API = {
  random: mangaPath.random,
  search: mangaPath.search,
  recommended: mangaPath.recommended,
};

const animeClient = createAPIClient(animeEndpoints);
const mangaClient = createAPIClient(mangaEndpoints);

export { animeClient, mangaClient };
