import url from '../../config/json/apis.json';
import axios from 'axios';

type API = {
  random: string;
  search: string;
  recommended: string;
};

type APIClient = {
  random: () => Promise<unknown>;
  search: (id: number) => Promise<unknown>;
  recommended: () => Promise<unknown>;
};

const request = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) return false;
    return response;
  } catch (error) {
    console.error('Error occurred:', error);
    return false;
  }
};

const createAPIClient = (endpoints: API): APIClient => {
  return {
    random: async () => {
      const response = await request(endpoints.random);
      if (!response) return false;
      return response;
    },
    search: async (id: number) => {
      const response = await request(`${endpoints.search}/${id}`);
      if (!response) return false;
      return response;
    },
    recommended: async () => {
      const response = await request(endpoints.recommended);
      if (!response) return false;
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
