import { Guild, GuildMember } from "discord.js";
import fs from "fs";
import { glob } from "glob";
import path from "node:path";

import { logWithLabel } from "../modules/LoggerUtils";

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

const getFile = (requestedPath: string, allowedExtensions: string[] = ['.js', '.mjs', '.cjs', '.ts']): string[] => {
  if (typeof allowedExtensions === 'string') {
    allowedExtensions = [allowedExtensions];
  }

  requestedPath ??= path.resolve(requestedPath);
  let res: string[] = [];

  for (let itemInDir of fs.readdirSync(requestedPath)) {
    itemInDir = path.resolve(requestedPath, itemInDir);
    const stat = fs.statSync(itemInDir);

    if (stat.isDirectory()) {
      res = res.concat(getFile(itemInDir, allowedExtensions));
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

const Discord = {
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
  getFiles: async function(requestedPath: string, allowedExtensions: string[] = ['.js', '.mjs', '.cjs', '.ts']) {
    if (typeof allowedExtensions === 'string') {
      allowedExtensions = [allowedExtensions];
    }

    requestedPath ??= path.resolve(requestedPath);
    let res: string[] = [];

    for (let itemInDir of fs.readdirSync(requestedPath)) {
      itemInDir = path.resolve(requestedPath, itemInDir);
      const stat = fs.statSync(itemInDir);

      if (stat.isDirectory()) {
        res = res.concat(getFile(itemInDir, allowedExtensions));
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
  },
  parse: async function(content: string, member: GuildMember, guild: Guild){
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

export { Discord };
