declare const Anime: {
    random: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    search: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    recommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
declare const Manga: {
    random: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    search: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    recommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
export { Anime, Manga };
