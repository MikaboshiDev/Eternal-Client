"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
async function request() {
    console.log(await index_1.anime.animeRandom());
    console.log(await index_1.manga.mangaRandom());
}
request();
//# sourceMappingURL=animelist.test.js.map