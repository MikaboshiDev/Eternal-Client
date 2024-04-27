export declare class mcStatus {
    type: string;
    ip: string;
    constructor(type: string, ip: string);
    getStatus(): Promise<any>;
}
