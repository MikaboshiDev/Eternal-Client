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
exports.setupModelMiddleware = exports.ToolsHub = exports.NekoClient = void 0;
/* ----- Functions ----- */
__exportStar(require("./src/functions/aplications"), exports);
__exportStar(require("./src/functions/animelist"), exports);
__exportStar(require("./src/functions/backend"), exports);
__exportStar(require("./src/libraries/akaneko"), exports);
__exportStar(require("./src/modules/console"), exports);
/* ----- Class Tools ----- */
var neko_client_1 = require("./src/class/neko-client");
Object.defineProperty(exports, "NekoClient", { enumerable: true, get: function () { return neko_client_1.NekoClient; } });
var tools_class_1 = require("./src/class/tools-class");
Object.defineProperty(exports, "ToolsHub", { enumerable: true, get: function () { return tools_class_1.ToolsHub; } });
/* ----- Middlewares ----- */
var mongo_1 = require("./src/modules/mongo");
Object.defineProperty(exports, "setupModelMiddleware", { enumerable: true, get: function () { return mongo_1.setupModelMiddleware; } });
//# sourceMappingURL=index.js.map