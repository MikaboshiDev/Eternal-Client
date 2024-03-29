"use strict";
/*
# Discord Server: http://discord.night-support.xyz/
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModelMiddleware = exports.antiCrash = exports.NekoClient = exports.ApiTools = void 0;
/* ----- Functions ----- */
__exportStar(require("./src/functions/akaneko"), exports);
__exportStar(require("./src/functions/animelist"), exports);
__exportStar(require("./src/functions/console"), exports);
__exportStar(require("./src/tools/handlers"), exports);
/* ----- Class Tools ----- */
var apiTools_1 = require("./src/class/apiTools");
Object.defineProperty(exports, "ApiTools", { enumerable: true, get: function () { return apiTools_1.ApiTools; } });
var nekoClient_1 = require("./src/class/nekoClient");
Object.defineProperty(exports, "NekoClient", { enumerable: true, get: function () { return nekoClient_1.NekoClient; } });
/* ----- Middlewares ----- */
var anti_crash_1 = require("./src/functions/anti.crash");
Object.defineProperty(exports, "antiCrash", { enumerable: true, get: function () { return anti_crash_1.antiCrash; } });
var mongo_1 = require("./src/tools/mongo");
Object.defineProperty(exports, "setupModelMiddleware", { enumerable: true, get: function () { return mongo_1.setupModelMiddleware; } });
//# sourceMappingURL=index.js.map