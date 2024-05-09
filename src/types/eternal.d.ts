/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'eternal' {
  namespace EternalAnime {
    export async function animeSearch(id: number): Promise<unknown>;
    export async function animeRecommended(): Promise<unknown>;
    export async function animeRandom(): Promise<unknown>;
  }

  namespace EternalManga {
    export function mangaSearch(id: number): Promise<unknown>;
    export function mangaRecommended(): Promise<unknown>;
    export function mangaRandom(): Promise<unknown>;
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
