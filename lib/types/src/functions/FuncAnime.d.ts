declare const animeClient: {
    random: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    search: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    recommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
declare const mangaClient: {
    random: () => Promise<false | import("axios").AxiosResponse<any, any>>;
    search: (id: number) => Promise<false | import("axios").AxiosResponse<any, any>>;
    recommended: () => Promise<false | import("axios").AxiosResponse<any, any>>;
};
export { animeClient, mangaClient };
