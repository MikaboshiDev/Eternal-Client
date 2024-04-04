"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWithLabel = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const chalk_1 = __importDefault(require("chalk"));
/* --- Define colors for log labels --- */
const labelColors = {
    error: chalk_1.default.redBright,
    success: chalk_1.default.greenBright,
    debug: chalk_1.default.magentaBright,
    express: chalk_1.default.blueBright,
    bots: chalk_1.default.cyanBright,
    api: chalk_1.default.hex('#ff0080'),
    multihub: chalk_1.default.hex('#FFA500'),
    website: chalk_1.default.yellowBright,
    info: chalk_1.default.blueBright,
    database: chalk_1.default.hex('#FF00FF'),
    whatsapp: chalk_1.default.hex('#25D366'),
    discord: chalk_1.default.hex('#80fe72'),
    telegram: chalk_1.default.hex('#1DA1F2'),
    maintenance: chalk_1.default.hex('#FFA500'),
};
/* --- Define labels for log messages --- */
const labelNames = {
    error: 'ERROR',
    success: 'SUCCESS',
    debug: 'DEBUG',
    express: 'EXPRESS',
    bots: 'BOTS',
    api: 'API',
    multihub: 'MULTIHUB',
    website: 'WEBSITE',
    info: 'INFO',
    database: 'DATABASE',
    whatsapp: 'WHATSAPP',
    discord: 'DISCORD',
    telegram: 'TELEGRAM',
    maintenance: 'MAINTENANCE',
};
/**
 * The function `logWithLabel` logs a message with a specified label and sends it to a Discord webhook.
 * @param {Labels} label - The `label` parameter in the `logWithLabel` function is used to specify the
 * type or category of the log message being logged. It is of type `Labels`, which likely is an enum or
 * a defined set of possible values representing different labels or categories for the log message.
 * @param {string} message - The `message` parameter in the `logWithLabel` function is a string that
 * represents the actual message or content that you want to log with a specific label. It could be any
 * information, warning, error, or status update that you want to display along with the label.
 */
function logWithLabel(label, message) {
    /* --- Log message to console --- */
    const _getLogOrigin = () => {
        let filename;
        const _pst = Error.prepareStackTrace;
        Error.prepareStackTrace = function (err, stack) {
            return stack;
        };
        try {
            /* The code snippet you provided is a part of the `_getLogOrigin` function in your TypeScript file.
      This function is responsible for determining the origin or source file of the log message being
      processed. Here's a breakdown of what the code is doing: */
            const err = new Error();
            let callerfile;
            const currentfile = err.stack.shift().getFileName();
            while (err.stack.length) {
                callerfile = err.stack.shift().getFileName();
                if (currentfile !== callerfile) {
                    filename = callerfile;
                    break;
                }
            }
        }
        catch (err) {
            throw new Error(err);
        }
        Error.prepareStackTrace = _pst;
        return filename;
    };
    /**
     * The `_getLogOrigin` function is a helper function that retrieves the origin or source of the log
     * message. It uses the `Error.prepareStackTrace` method to get the stack trace and extract the file
     * name of the calling file. This is used to determine the origin of the log message.
     * @returns {string} - The file name of the calling file, which is used as the origin of the log message.
     */
    const origin = _getLogOrigin().split(/[\\/]/).pop();
    const time = new Date().toLocaleTimeString();
    const labelColor = labelColors[label];
    const labelName = labelNames[label];
    console.log(labelColor(`${time}  ${labelName.padEnd(10, ' ')} | `) +
        chalk_1.default.grey(`${origin.length > 25 ? origin.substring(0, 17) + '...' : origin}`) +
        ' '.repeat(25 - (origin.length > 25 ? 25 : origin.length)) +
        ` | ${message}`);
}
exports.logWithLabel = logWithLabel;
//# sourceMappingURL=console.js.map