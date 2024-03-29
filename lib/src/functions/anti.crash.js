"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.antiCrash = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const console_1 = require("./console");
function createField(name, value) {
    return { name, value: (0, discord_js_1.codeBlock)('js', (0, util_1.inspect)(value, { depth: 0 }).slice(0, 300)) };
}
function handleUncaughtException(event, err, origin) {
    const embed = new discord_js_1.EmbedBuilder()
        .setAuthor({
        name: `Function handleUncaughtException - ${event}`,
    })
        .setColor('Red')
        .setTimestamp()
        .setTitle(event)
        .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
        .setFields(createField('Error', err), createField('Origin', origin));
    (0, console_1.logWithLabel)('error', `${origin}`);
    (0, console_1.logWithLabel)('error', `${err}`);
    return embed;
}
function antiCrash({ client, webhook }) {
    client.on('error', (err) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: `Function AntiCrash - ${client.user?.username}`,
            iconURL: client.user?.displayAvatarURL(),
        })
            .setColor('Red')
            .setTimestamp()
            .setFields(createField('Error', err))
            .setTitle('Discord API Error')
            .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors');
        webhook.send({ embeds: [embed] });
        (0, console_1.logWithLabel)('error', `${err}`);
    });
    process.on('unhandledRejection', (reason, promise) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: `Function AntiCrash - ${client.user?.username}`,
            iconURL: client.user?.displayAvatarURL(),
        })
            .setColor('Red')
            .setTimestamp()
            .setTitle('Unhandled Rejection/Catch')
            .setFields(createField('Reason', reason), createField('Promise', promise))
            .setURL('https://nodejs.org/api/process.html#event-unhandledrejection');
        webhook.send({ embeds: [embed] });
        (0, console_1.logWithLabel)('error', `${reason}`);
    });
    process.on('uncaughtException', (err, origin) => {
        handleUncaughtException('Uncaught Exception/Catch', err, origin), (0, console_1.logWithLabel)('error', `${origin}`);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        handleUncaughtException('Uncaught Exception Monitor', err, origin), (0, console_1.logWithLabel)('error', `${origin}`);
    });
    process.on('warning', (warning) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({
            name: `Function AntiCrash - ${client.user?.username}`,
            iconURL: client.user?.displayAvatarURL(),
        })
            .setColor('Red')
            .setTimestamp()
            .setFields(createField('Warning', warning))
            .setTitle('Warning')
            .setURL('https://nodejs.org/api/process.html#event-warning');
        webhook.send({ embeds: [embed] });
        (0, console_1.logWithLabel)('error', `${warning}`);
    });
}
exports.antiCrash = antiCrash;
//# sourceMappingURL=anti.crash.js.map