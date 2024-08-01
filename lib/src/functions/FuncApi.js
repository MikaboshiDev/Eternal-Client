"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backend = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LoggerUtils_1 = require("../modules/LoggerUtils");
const Backend = {
    ServerError: async function (res, error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: error?.message,
        });
    },
    RouterHandler: async function (paths) {
        const routerLoadeds = [];
        const router = (0, express_1.Router)();
        paths.forEach((rute) => {
            fs_1.default.readdirSync(rute).forEach((file) => {
                if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
                    const modulePath = path_1.default.join(rute, file);
                    Promise.resolve(`${modulePath}`).then(s => __importStar(require(s))).then((module) => {
                        if (module.default) {
                            const routesHandler = module.default;
                            routesHandler({ app: router });
                        }
                        else {
                            (0, LoggerUtils_1.logWithLabel)('custom', `No default export found in ${modulePath}`, 'Express');
                        }
                    })
                        .catch((err) => {
                        (0, LoggerUtils_1.logWithLabel)('custom', `Error while importing ${modulePath}: ${err}`, 'Express');
                    });
                    routerLoadeds.push(file);
                }
            });
        });
        return router;
    }
};
exports.Backend = Backend;
//# sourceMappingURL=FuncApi.js.map