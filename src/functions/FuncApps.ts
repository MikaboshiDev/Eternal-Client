import { glob } from 'glob';
import path from 'node:path';

import { logWithLabel } from '../modules/LoggerUtils';

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

async function deleteCachedFile(file: string) {
  const filePath = path.resolve(file);
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

const EternalDiscord = {
  findClosestCommand: function (command: string, validCommands: Array<string>) {
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
  loadFiles: async function (dirName: string) {
    try {
      const files = await glob(path.join(process.cwd(), dirName, '**/*.{ts,js}').replace(/\\/g, '/'));
      const jsFiles = files.filter((file: string) => path.extname(file) === '.ts' || path.extname(file) === '.js');
      await Promise.all(jsFiles.map(deleteCachedFile));
      return jsFiles;
    } catch (error) {
      logWithLabel('error', `Error loading files: ${error}`);
      throw error;
    }
  },
};

export { EternalDiscord };
