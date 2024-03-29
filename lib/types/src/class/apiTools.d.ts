/* eslint-disable @typescript-eslint/no-explicit-any */
export declare class ApiTools {
    client: any;
    url: string;
    constructor(url: string, client: any);
    postAppWeb({ description, iconURL, ownerId, licence, email, supportServer, }: {
        description: string;
        iconURL: string;
        ownerId: string;
        licence: string;
        email: string;
        supportServer: string;
    }): Promise<void>;
    getAppWeb({ id }: {
        id: string;
    }): Promise<void>;
    getAppsWeb(): Promise<void>;
}
