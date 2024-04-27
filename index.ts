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
export * from './src/functions/animelist';
export * from './src/functions/akaneko';
export * from './src/tools/console';

/* ----- Class Tools ----- */
export { NekoClient } from './src/class/nekoClient';
export { mcStatus } from './src/class/mcStatus';

/* ----- Middlewares ----- */
export { antiCrash } from './src/tools/anti-crash';
export { setupModelMiddleware } from './src/tools/mongo';
