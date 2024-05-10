/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response, Request } from 'express';
import { logWithLabel } from '../modules/console';

const EternalBackend = {
  handleServerError: function (res: Response, error: Error | any) {
    res.status(500).json({
      status: false,
      message: 'INTERNAL SERVER ERROR',
      data: error?.message,
    });
  },
  morganMiddleware: function (res: Response, req: Request, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logWithLabel('api', `${req.method} ${req.path} ${res.statusCode} - ${duration / 1000 / 60} minutes`);
    });
    next();
  },
};

export { EternalBackend };