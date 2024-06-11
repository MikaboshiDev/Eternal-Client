"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternalDiscord = void 0;
const glob_1 = require("glob");
const node_path_1 = __importDefault(require("node:path"));
const LoggerUtils_1 = require("../modules/LoggerUtils");
function levenshteinDistance(a, b) {
    if (!a.length)
        return b.length;
    if (!b.length)
        return a.length;
    return a[0] === b[0]
        ? levenshteinDistance(a.slice(1), b.slice(1))
        : Math.min(levenshteinDistance(a.slice(1), b), levenshteinDistance(a, b.slice(1)), levenshteinDistance(a.slice(1), b.slice(1))) + 1;
}
async function deleteCachedFile(file) {
    const filePath = node_path_1.default.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}
const EternalDiscord = {
    findClosestCommand: function (command, validCommands) {
        let closestCommand = '';
        let shortestDistance = Infinity;
        for (const validCommand of validCommands) {
            const distance = levenshteinDistance(command, validCommand);
            if (distance < shortestDistance) {
                closestCommand = validCommand;
                shortestDistance = distance;
            }
        }
        return closestCommand;
    },
    loadFiles: async function (dirName) {
        try {
            const files = await (0, glob_1.glob)(node_path_1.default.join(process.cwd(), dirName, '**/*.{ts,js}').replace(/\\/g, '/'));
            const jsFiles = files.filter((file) => node_path_1.default.extname(file) === '.ts' || node_path_1.default.extname(file) === '.js');
            await Promise.all(jsFiles.map(deleteCachedFile));
            return jsFiles;
        }
        catch (error) {
            (0, LoggerUtils_1.logWithLabel)('error', `Error loading files: ${error}`);
            throw error;
        }
    },
};
exports.EternalDiscord = EternalDiscord;
//# sourceMappingURL=FuncApps.js.map