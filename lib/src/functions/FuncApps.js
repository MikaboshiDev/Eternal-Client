"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discord = void 0;
const fs_1 = __importDefault(require("fs"));
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
const getFile = (requestedPath, allowedExtensions = ['.js', '.mjs', '.cjs', '.ts']) => {
    if (typeof allowedExtensions === 'string') {
        allowedExtensions = [allowedExtensions];
    }
    requestedPath ??= node_path_1.default.resolve(requestedPath);
    let res = [];
    for (let itemInDir of fs_1.default.readdirSync(requestedPath)) {
        itemInDir = node_path_1.default.resolve(requestedPath, itemInDir);
        const stat = fs_1.default.statSync(itemInDir);
        if (stat.isDirectory()) {
            res = res.concat(getFile(itemInDir, allowedExtensions));
        }
        if (stat.isFile() &&
            allowedExtensions.find((ext) => itemInDir.endsWith(ext)) &&
            !itemInDir.slice(itemInDir.lastIndexOf(node_path_1.default.sep) + 1, itemInDir.length).startsWith('.')) {
            res.push(itemInDir);
        }
    }
    return res;
};
const Discord = {
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
    getFiles: async function (requestedPath, allowedExtensions = ['.js', '.mjs', '.cjs', '.ts']) {
        if (typeof allowedExtensions === 'string') {
            allowedExtensions = [allowedExtensions];
        }
        requestedPath ??= node_path_1.default.resolve(requestedPath);
        let res = [];
        for (let itemInDir of fs_1.default.readdirSync(requestedPath)) {
            itemInDir = node_path_1.default.resolve(requestedPath, itemInDir);
            const stat = fs_1.default.statSync(itemInDir);
            if (stat.isDirectory()) {
                res = res.concat(getFile(itemInDir, allowedExtensions));
            }
            if (stat.isFile() &&
                allowedExtensions.find((ext) => itemInDir.endsWith(ext)) &&
                !itemInDir.slice(itemInDir.lastIndexOf(node_path_1.default.sep) + 1, itemInDir.length).startsWith('.')) {
                res.push(itemInDir);
            }
        }
        return res;
    },
    parse: async function (content, member, guild) {
        return content
            .replaceAll(/\\n/g, '\n')
            .replaceAll(/{server}/g, member.guild.name)
            .replaceAll(/{member:id}/g, member.id)
            .replaceAll(/{member:name}/g, member.displayName)
            .replaceAll(/{member:mention}/g, member.toString())
            .replaceAll(/{guils:name}/g, guild.name)
            .replaceAll(/{member:tag}/g, member.user.tag);
    },
};
exports.Discord = Discord;
//# sourceMappingURL=FuncApps.js.map