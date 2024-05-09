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

/* ----- Functions ----- */
export * from "./src/functions/aplications";
export * from './src/functions/animelist';
export * from './src/functions/backend';
export * from './src/libraries/akaneko';
export * from './src/modules/console';

/* ----- Class Tools ----- */
export { NekoClient } from './src/class/neko-client';
export { ToolsHub } from './src/class/tools-class';

/* ----- Middlewares ----- */
export { setupModelMiddleware } from './src/modules/mongo';
