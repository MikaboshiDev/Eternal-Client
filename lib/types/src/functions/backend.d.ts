import { NextFunction, Response, Request } from 'express';
declare const EternalBackend: {
    handleServerError: (res: Response, error: Error | any) => void;
    morganMiddleware: (res: Response, req: Request, next: NextFunction) => void;
};
export { EternalBackend };
