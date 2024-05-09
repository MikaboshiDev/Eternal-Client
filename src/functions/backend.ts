/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response, Request } from 'express';
import { logWithLabel } from '../modules/console';

/**
 * The function `handleServerError` sends a 500 status response with an error message in a JSON format.
 * @param {Response} res - The `res` parameter in the `handleServerError` function is of type
 * `Response`, which is typically the response object in an Express.js application. This object is used
 * to send a response back to the client making the request.
 * @param {Error | any} error - The `error` parameter in the `handleServerError` function is of type
 * `Error` or `any`, which means it can either be an instance of the `Error` class or any other type of
 * value. This parameter is used to capture the error that occurred during the server operation.
 */
export function handleServerError(res: Response, error: Error | any) {
  res.status(500).json({
    status: false,
    message: 'INTERNAL SERVER ERROR',
    data: error?.message,
  });
}

/**
 * The `morganMiddleware` function logs API request details and response time using the morgan logging
 * library in a TypeScript environment.
 * @param {Response} res - Response object from Express framework, representing the HTTP response that
 * the server sends back to the client.
 * @param {Request} req - The `req` parameter typically represents the request object in an Express
 * middleware function. It contains information about the incoming HTTP request such as headers,
 * parameters, query strings, and more.
 * @param {NextFunction} next - The `next` parameter in the `morganMiddleware` function is a callback
 * function that is used to pass control to the next middleware function in the stack. When called, it
 * tells Express to move on to the next middleware or route handler in the chain. This allows for
 * sequential execution of middleware functions in
 */
export function morganMiddleware(res: Response, req: Request, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logWithLabel('api', `${req.method} ${req.path} ${res.statusCode} - ${duration / 1000 / 60} minutes`);
  });
  next();
}