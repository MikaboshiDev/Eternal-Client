declare const anime: {
    animeRandom: () => Promise<any>;
    animeSearch: (id: number) => Promise<any>;
    animeRecommended: () => Promise<any>;
};
declare const manga: {
    mangaRandom: () => Promise<any>;
    mangaSearch: (id: number) => Promise<any>;
    mangaRecommended: () => Promise<any>;
};
export { anime, manga };
