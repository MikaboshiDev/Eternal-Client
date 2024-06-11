import { Response } from "express";
declare const EternalBackend: {
    handleServerError: (res: Response, error: Error | any) => void;
};
export { EternalBackend };
