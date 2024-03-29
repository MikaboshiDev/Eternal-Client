/* eslint-disable @typescript-eslint/no-explicit-any */
declare const anime: {
    animeRandom: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    animeSearch: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    animeRecommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
declare const manga: {
    mangaRandom: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    mangaSearch: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    mangaRecommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
export { anime, manga };
