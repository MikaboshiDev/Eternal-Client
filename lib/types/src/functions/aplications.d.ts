/**
 * The function `findClosestCommand` takes a command and an array of valid commands, and returns the
 * closest valid command based on the Levenshtein distance.
 * @param {string} command - The `command` parameter is a string representing the command that the user
 * entered and for which we want to find the closest valid command from the `validCommands` array.
 * @param validCommands - An array of valid commands that the user can input.
 * @returns The function `findClosestCommand` returns the closest valid command from the
 * `validCommands` array based on the Levenshtein distance calculation with the input `command`.
 */
export declare function findClosestCommand(command: string, validCommands: Array<string>): string;
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
export declare const getFiles: (requestedPath: string, allowedExtensions?: string[]) => string[];
/**
 * This TypeScript function asynchronously loads and deletes cached JavaScript and TypeScript files
 * from a specified directory.
 * @param {string} dirName - The `dirName` parameter in the `loadFiles` function is a string that
 * represents the directory name where the files will be loaded from.
 * @returns The function `loadFiles` returns an array of JavaScript and TypeScript files after deleting
 * their cached versions.
 */
export declare function loadFiles(dirName: string): Promise<string[]>;
