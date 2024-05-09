import { logWithLabel } from '../modules/console';
import path from 'node:path';
import { glob } from 'glob';
import fs from 'fs';

/**
 * The function `findClosestCommand` takes a command and an array of valid commands, and returns the
 * closest valid command based on the Levenshtein distance.
 * @param {string} command - The `command` parameter is a string representing the command that the user
 * entered and for which we want to find the closest valid command from the `validCommands` array.
 * @param validCommands - An array of valid commands that the user can input.
 * @returns The function `findClosestCommand` returns the closest valid command from the
 * `validCommands` array based on the Levenshtein distance calculation with the input `command`.
 */
export function findClosestCommand(command: string, validCommands: Array<string>) {
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
function levenshteinDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  return a[0] === b[0]
    ? levenshteinDistance(a.slice(1), b.slice(1))
    : Math.min(
        levenshteinDistance(a.slice(1), b),
        levenshteinDistance(a, b.slice(1)),
        levenshteinDistance(a.slice(1), b.slice(1))
      ) + 1;
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
export const getFiles = (
  requestedPath: string,
  allowedExtensions: string[] = ['.js', '.mjs', '.cjs', '.ts']
): string[] => {
  if (typeof allowedExtensions === 'string') {
    allowedExtensions = [allowedExtensions];
  }

  requestedPath ??= path.resolve(requestedPath);
  let res: string[] = [];

  for (let itemInDir of fs.readdirSync(requestedPath)) {
    itemInDir = path.resolve(requestedPath, itemInDir);
    const stat = fs.statSync(itemInDir);

    if (stat.isDirectory()) {
      res = res.concat(getFiles(itemInDir, allowedExtensions));
    }

    if (
      stat.isFile() &&
      allowedExtensions.find((ext) => itemInDir.endsWith(ext)) &&
      !itemInDir.slice(itemInDir.lastIndexOf(path.sep) + 1, itemInDir.length).startsWith('.')
    ) {
      res.push(itemInDir);
    }
  }

  return res;
};

/**
 * The function `deleteCachedFile` deletes a cached file from the require cache in Node.js.
 * @param {string} file - The `file` parameter in the `deleteCachedFile` function is a string that
 * represents the path to the file that you want to delete from the require cache.
 */
async function deleteCachedFile(file: string) {
  const filePath = path.resolve(file);
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
export async function loadFiles(dirName: string) {
  try {
    const files = await glob(path.join(process.cwd(), dirName, '**/*.{ts,js}').replace(/\\/g, '/'));
    const jsFiles = files.filter((file: string) => path.extname(file) === '.ts' || path.extname(file) === '.js');
    await Promise.all(jsFiles.map(deleteCachedFile));
    return jsFiles;
  } catch (error) {
    logWithLabel('error', `Error loading files: ${error}`);
    throw error;
  }
}