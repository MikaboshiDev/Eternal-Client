interface ClientType {
    commands: Map<string, unknown>;
}
export declare const handlers: {
    handlerRouter: ({ rute, extension }: {
        rute: string;
        extension: string;
    }) => Promise<void>;
    handlerWhatsapp: ({ rute, client, extension }: {
        rute: string;
        client: ClientType;
        extension: string;
    }) => Promise<void>;
    handlerDiscord: ({ dirName, extension }: {
        dirName: string;
        extension: string;
    }) => Promise<string[]>;
};
export {};
