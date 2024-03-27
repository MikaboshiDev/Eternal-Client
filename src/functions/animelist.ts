import axios from 'axios';
import apis from '../config/apis.json';

export async function animeRandom() {
  const response = await axios.get(apis.endpoints.animes.random);
  if (response.status !== 200) return false;
  return response.data;
}

export async function mangaRandom() {
  const response = await axios.get(apis.endpoints.manga.random);
  if (response.status !== 200) return false;
  return response.data;
}

export async function mangaSearch(id: number) {
  const response = await axios.get(`${apis.endpoints.manga.search}${id}/full`);
  if (response.status !== 200) return false;
  return response.data;
}

export async function animeSearch(id: number) {
  const response = await axios.get(`${apis.endpoints.animes.search}${id}/full`);
  if (response.status !== 200) return false;
  return response.data;
}

export async function animeRecommended() {
  const response = await axios.get(`${apis.endpoints.animes.recommended}`);
  if (response.status !== 200) return false;
  return response.data;
}

export async function mangaRecommended() {
  const response = await axios.get(`${apis.endpoints.manga.recommended}`);
  if (response.status !== 200) return false;
  return response.data;
}
