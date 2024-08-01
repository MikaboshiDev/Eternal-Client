/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Router } from "express";
import fs from "fs";
import path from "path";

import { logWithLabel } from "../modules/LoggerUtils";

const Backend = {
  ServerError: async function (res: Response, error: Error | any) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: error?.message,
    });
  },
  RouterHandler: async function(paths: string[]) {
    const routerLoadeds = [];
    const router = Router();
    paths.forEach((rute) => {
      fs.readdirSync(rute).forEach((file) => {
        if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
          const modulePath = path.join(rute, file);
          import(modulePath)
            .then((module) => {
              if (module.default) {
                const routesHandler = module.default;
                routesHandler({ app: router });
              } else {
                logWithLabel('custom', `No default export found in ${modulePath}`, 'Express');
              }
            })
            .catch((err) => {
              logWithLabel('custom', `Error while importing ${modulePath}: ${err}`, 'Express');
            });

          routerLoadeds.push(file);
        }
      });
    });

    return router;
  }
};

export { Backend };
