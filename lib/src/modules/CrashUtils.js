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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiCrash = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const winston_1 = __importStar(require("winston"));
const LoggerUtils_1 = require("./LoggerUtils");
function createField(name, value) {
    return { name, value: (0, discord_js_1.codeBlock)('js', (0, util_1.inspect)(value, { depth: 0 }).slice(0, 300)) };
}
const date = `-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
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
    (0, LoggerUtils_1.logWithLabel)('error', `${origin}`);
    (0, LoggerUtils_1.logWithLabel)('error', `${err}`);
    console.log(origin);
    console.log(err);
    return embed;
}
function AntiCrash({ client, webhookUrl, path }) {
    const webhook = new discord_js_1.WebhookClient({ url: webhookUrl });
    const logger = winston_1.default.createLogger({
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6,
        },
        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((log) => `[${log.timestamp.split('T')[1].split('.')[0]} ${log.level}] ${log.message}`)),
        defaultMeta: { service: 'user-service' },
        transports: [new winston_1.default.transports.File({ filename: `${path}/log${date}.log` })],
        rejectionHandlers: [new winston_1.default.transports.File({ filename: `${path}/log${date}.log` })],
        exceptionHandlers: [new winston_1.default.transports.File({ filename: `${path}/log${date}.log` })],
    });
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
        (0, LoggerUtils_1.logWithLabel)('error', `${err}`);
        logger.error(err);
        console.log(err);
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
        (0, LoggerUtils_1.logWithLabel)('error', `${reason}`);
        logger.error(reason);
    });
    process.on('uncaughtException', (err, origin) => {
        handleUncaughtException('Uncaught Exception/Catch', err, origin), (0, LoggerUtils_1.logWithLabel)('error', `${origin}`);
        logger.error(origin);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        handleUncaughtException('Uncaught Exception Monitor', err, origin), (0, LoggerUtils_1.logWithLabel)('error', `${origin}`);
        logger.error(origin);
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
        (0, LoggerUtils_1.logWithLabel)('error', `${warning}`);
    });
}
exports.AntiCrash = AntiCrash;
//# sourceMappingURL=CrashUtils.js.map