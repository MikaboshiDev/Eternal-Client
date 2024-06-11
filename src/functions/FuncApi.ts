/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

const EternalBackend = {
  handleServerError: function (res: Response, error: Error | any) {
    res.status(500).json({
      status: false,
      message: 'INTERNAL SERVER ERROR',
      data: error?.message,
    });
  }
};

export { EternalBackend };
