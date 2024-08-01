import { Response } from "express";
declare const Backend: {
    ServerError: (res: Response, error: Error | any) => Promise<void>;
    RouterHandler: (paths: string[]) => Promise<import("express-serve-static-core").Router>;
};
export { Backend };
