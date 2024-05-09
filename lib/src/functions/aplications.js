"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFiles = exports.getFiles = exports.findClosestCommand = void 0;
const console_1 = require("../modules/console");
const node_path_1 = __importDefault(require("node:path"));
const glob_1 = require("glob");
const fs_1 = __importDefault(require("fs"));
/**
 * The function `findClosestCommand` takes a command and an array of valid commands, and returns the
 * closest valid command based on the Levenshtein distance.
 * @param {string} command - The `command` parameter is a string representing the command that the user
 * entered and for which we want to find the closest valid command from the `validCommands` array.
 * @param validCommands - An array of valid commands that the user can input.
 * @returns The function `findClosestCommand` returns the closest valid command from the
 * `validCommands` array based on the Levenshtein distance calculation with the input `command`.
 */
function findClosestCommand(command, validCommands) {
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
}
exports.findClosestCommand = findClosestCommand;
/**
 * The `levenshteinDistance` function calculates the Levenshtein distance between two strings
 * recursively in TypeScript.
 * @param {string} a - The `a` parameter in the `levenshteinDistance` function represents the first
 * string for which you want to calculate the Levenshtein distance.
 * @param {string} b - The `b` parameter in the `levenshteinDistance` function represents the second
 * string for which you want to calculate the Levenshtein distance from the first string `a`. This
 * algorithm calculates the minimum number of single-character edits (insertions, deletions, or
 * substitutions) required to
 * @returns The function `levenshteinDistance` returns the Levenshtein distance between two input
 * strings `a` and `b`, which is the minimum number of single-character edits (insertions, deletions,
 * or substitutions) required to change one string into the other.
 */
function levenshteinDistance(a, b) {
    if (!a.length)
        return b.length;
    if (!b.length)
        return a.length;
    return a[0] === b[0]
        ? levenshteinDistance(a.slice(1), b.slice(1))
        : Math.min(levenshteinDistance(a.slice(1), b), levenshteinDistance(a, b.slice(1)), levenshteinDistance(a.slice(1), b.slice(1))) + 1;
}
/**
 * The function `getFiles` recursively retrieves files with specified extensions from a given directory
 * path in TypeScript.
 * @param {string} requestedPath - The `requestedPath` parameter is a string that represents the path
 * of the directory from which you want to retrieve files.
 * @param {string[]} allowedExtensions - The `allowedExtensions` parameter in the `getFiles` function
 * is an optional parameter that specifies an array of file extensions that are allowed to be included
 * in the result. By default, it is set to `['.js', '.mjs', '.cjs', '.ts']`, but you
 * @returns The `getFiles` function returns an array of file paths that match the allowed extensions
 * and are not hidden files (files that start with a dot).
 */
const getFiles = (requestedPath, allowedExtensions = ['.js', '.mjs', '.cjs', '.ts']) => {
    if (typeof allowedExtensions === 'string') {
        allowedExtensions = [allowedExtensions];
    }
    requestedPath ??= node_path_1.default.resolve(requestedPath);
    let res = [];
    for (let itemInDir of fs_1.default.readdirSync(requestedPath)) {
        itemInDir = node_path_1.default.resolve(requestedPath, itemInDir);
        const stat = fs_1.default.statSync(itemInDir);
        if (stat.isDirectory()) {
            res = res.concat((0, exports.getFiles)(itemInDir, allowedExtensions));
        }
        if (stat.isFile() &&
            allowedExtensions.find((ext) => itemInDir.endsWith(ext)) &&
            !itemInDir.slice(itemInDir.lastIndexOf(node_path_1.default.sep) + 1, itemInDir.length).startsWith('.')) {
            res.push(itemInDir);
        }
    }
    return res;
};
exports.getFiles = getFiles;
/**
 * The function `deleteCachedFile` deletes a cached file from the require cache in Node.js.
 * @param {string} file - The `file` parameter in the `deleteCachedFile` function is a string that
 * represents the path to the file that you want to delete from the require cache.
 */
async function deleteCachedFile(file) {
    const filePath = node_path_1.default.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}
/**
 * This TypeScript function asynchronously loads and deletes cached JavaScript and TypeScript files
 * from a specified directory.
 * @param {string} dirName - The `dirName` parameter in the `loadFiles` function is a string that
 * represents the directory name where the files will be loaded from.
 * @returns The function `loadFiles` returns an array of JavaScript and TypeScript files after deleting
 * their cached versions.
 */
async function loadFiles(dirName) {
    try {
        const files = await (0, glob_1.glob)(node_path_1.default.join(process.cwd(), dirName, '**/*.{ts,js}').replace(/\\/g, '/'));
        const jsFiles = files.filter((file) => node_path_1.default.extname(file) === '.ts' || node_path_1.default.extname(file) === '.js');
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;
    }
    catch (error) {
        (0, console_1.logWithLabel)('error', `Error loading files: ${error}`);
        throw error;
    }
}
exports.loadFiles = loadFiles;
//# sourceMappingURL=aplications.js.map