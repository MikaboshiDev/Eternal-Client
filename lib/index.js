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
exports.setupModelMiddleware = exports.ToolsHub = exports.NekoClient = exports.DiscordLogger = void 0;
//###############################################
//##-------------------------------------------##
//##                Functions                  ##
//##-------------------------------------------##
//###############################################
__exportStar(require("./src/libraries/AkanekoLib"), exports);
__exportStar(require("./src/functions/FuncAnime"), exports);
__exportStar(require("./src/functions/FuncApps"), exports);
__exportStar(require("./src/modules/CrashUtils"), exports);
__exportStar(require("./src/functions/FuncApi"), exports);
//###############################################
//##-------------------------------------------##
//##               Class Tools                 ##
//##-------------------------------------------##
//###############################################
var DiscordLogger_1 = require("./src/class/DiscordLogger");
Object.defineProperty(exports, "DiscordLogger", { enumerable: true, get: function () { return DiscordLogger_1.DiscordLogger; } });
var NekoClient_1 = require("./src/class/NekoClient");
Object.defineProperty(exports, "NekoClient", { enumerable: true, get: function () { return NekoClient_1.NekoClient; } });
var ToolsClient_1 = require("./src/class/ToolsClient");
Object.defineProperty(exports, "ToolsHub", { enumerable: true, get: function () { return ToolsClient_1.ToolsHub; } });
//###############################################
//##-------------------------------------------##
//##               Middlewares                 ##
//##-------------------------------------------##
//###############################################
var MongoUtils_1 = require("./src/modules/MongoUtils");
Object.defineProperty(exports, "setupModelMiddleware", { enumerable: true, get: function () { return MongoUtils_1.setupModelMiddleware; } });
//# sourceMappingURL=index.js.map