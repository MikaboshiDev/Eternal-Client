import axios from "axios";

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

export async function animeRandom() {
  const response = await axios.get(apis.animes.random);
  if (response.status !== 200) return false
  return response.data;
}

export async function mangaRandom() {
  const response = await axios.get(apis.manga.random);
  if (response.status !== 200) return false
  return response.data;
}

export async function mangaSearch(id: number) {
  const response = await axios.get(`${apis.manga.search}${id}/full`);
  if (response.status !== 200) return false
  return response.data;
}

export async function animeSearch(id: number) {
  const response = await axios.get(`${apis.animes.search}${id}/full`);
  if (response.status !== 200) return false
  return response.data;
}

export async function animeRecommended() {
  const response = await axios.get(`${apis.animes.recommended}`);
  if (response.status !== 200) return false
  return response.data;
}

export async function mangaRecommended() {
  const response = await axios.get(`${apis.manga.recommended}`);
  if (response.status !== 200) return false
  return response.data;
}