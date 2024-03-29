import { Router } from 'express';
import { glob } from 'glob';
import path from 'path';
const router = Router();
import fs from 'fs';

interface ClientType {
   commands: Map<string, unknown>;
}

function loadCommandsFromDirectory(client: ClientType, directoryPath: string, extension: string): void {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      loadCommandsFromDirectory(client, filePath, extension);
    } else if (filePath.endsWith(extension)) {
      import(filePath).then((command) => {
        client.commands.set(command.name, command);
      });
    }
  });
}

async function deleteCachedFile(file: string) {
  const filePath = path.resolve(file);
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

export const handlers = {
  handlerRouter: async function ({ rute, extension }: { rute: string; extension: string }) {
    const location = path.join(__dirname, rute);
    fs.readdirSync(location).forEach((file): void => {
      if (file.endsWith(extension)) {
        const modulePath = path.join(location, file);
        import(modulePath)
          .then((module): void => {
            if (module.router) {
              router.use(module.router);
            } else {
              throw new Error(`No router exported from ${modulePath}`);
            }
          })
          .catch((err): void => {
            throw new Error(`Error importing ${modulePath}: ${err}`);
          });
      }
    });
  },
  handlerWhatsapp: async function ({ rute, client, extension }: { rute: string; client: ClientType; extension: string }) {
    const commandsPath = path.join(__dirname, rute);
    loadCommandsFromDirectory(client, commandsPath, extension);
  },
  handlerDiscord: async function ({ dirName, extension }: { dirName: string; extension: string }) {
    try {
      const files = await glob(path.join(process.cwd(), dirName, `**/*${extension}`).replace(/\\/g, '/'));
      const jsFiles = files.filter((file: string) => path.extname(file) === `${extension}`);
      await Promise.all(jsFiles.map(deleteCachedFile));
      return jsFiles;
    } catch (error) {
      throw new Error('Error loading files in the discord bot');
    }
  },
};
