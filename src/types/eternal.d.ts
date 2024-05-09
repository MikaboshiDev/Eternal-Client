/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'eternal' {
  namespace EternalAnime {
    export async function animeClient(): Promise<void>;
  }

  namespace EternalManga {
    export function mangaClient(): Promise<void>;
  }

  namespace EternalBackend {
    export function morganMiddleware(res: Response, req: Request, next: NextFunction): void;
    export function handleServerError(res: Response, error: Error | any): void;
  }

  namespace EternalDiscord {
    export function getFiles(requestedPath: string, allowedExtensions?: string | string[]): string[];
    export function findClosestCommand(command: string, validCommands: Array<string>): string;
    export function loadFiles(dirName: string): Promise<string[]>;
  }
}
