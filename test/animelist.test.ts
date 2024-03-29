import { anime, manga } from "../src/index";
async function request() {
   console.log(await anime.animeRandom());
   console.log(await manga.mangaRandom());
}

request();