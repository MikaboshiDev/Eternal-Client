import { anime, manga } from '../index';
async function request() {
  console.log(await anime.animeRandom());
  console.log(await manga.mangaRandom());
}

request();
