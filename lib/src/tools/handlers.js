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
exports.handlers = void 0;
const express_1 = require("express");
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
function loadCommandsFromDirectory(client, directoryPath, extension) {
    const files = fs_1.default.readdirSync(directoryPath);
    files.forEach((file) => {
        const filePath = path_1.default.join(directoryPath, file);
        const stats = fs_1.default.statSync(filePath);
        if (stats.isDirectory()) {
            loadCommandsFromDirectory(client, filePath, extension);
        }
        else if (filePath.endsWith(extension)) {
            Promise.resolve(`${filePath}`).then(s => __importStar(require(s))).then((command) => {
                client.commands.set(command.name, command);
            });
        }
    });
}
async function deleteCachedFile(file) {
    const filePath = path_1.default.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}
exports.handlers = {
    handlerRouter: async function ({ rute, extension }) {
        const location = path_1.default.join(__dirname, rute);
        fs_1.default.readdirSync(location).forEach((file) => {
            if (file.endsWith(extension)) {
                const modulePath = path_1.default.join(location, file);
                Promise.resolve(`${modulePath}`).then(s => __importStar(require(s))).then((module) => {
                    if (module.router) {
                        router.use(module.router);
                    }
                    else {
                        throw new Error(`No router exported from ${modulePath}`);
                    }
                })
                    .catch((err) => {
                    throw new Error(`Error importing ${modulePath}: ${err}`);
                });
            }
        });
    },
    handlerWhatsapp: async function ({ rute, client, extension }) {
        const commandsPath = path_1.default.join(__dirname, rute);
        loadCommandsFromDirectory(client, commandsPath, extension);
    },
    handlerDiscord: async function ({ dirName, extension }) {
        try {
            const files = await (0, glob_1.glob)(path_1.default.join(process.cwd(), dirName, `**/*${extension}`).replace(/\\/g, '/'));
            const jsFiles = files.filter((file) => path_1.default.extname(file) === `${extension}`);
            await Promise.all(jsFiles.map(deleteCachedFile));
            return jsFiles;
        }
        catch (error) {
            throw new Error('Error loading files in the discord bot');
        }
    },
};
//# sourceMappingURL=handlers.js.map