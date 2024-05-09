type APIClient = {
    random: () => Promise<unknown>;
    search: (id: number) => Promise<unknown>;
    recommended: () => Promise<unknown>;
};
declare const animeClient: APIClient;
declare const mangaClient: APIClient;
export { animeClient, mangaClient };
