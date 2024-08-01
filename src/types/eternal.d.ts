import { Client } from "discord.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'eternal' {
  export async function Anime(): Promise<void>;
  export function Manga(): Promise<void>;
  namespace Backend {
    export function ServerError(res: Response, error: Error | any): void;
    export function RouterHandler(paths: string[]): Promise<Router>;
  }

  namespace Discord {
    export function getFiles(
      requestedPath: string,
      allowedExtensions: string[] = ['.js', '.mjs', '.cjs', '.ts']
    ): Promise<string[]>;
    export function parse(content: string, member: GuildMember, guild: Guild): Promise<string>;
    export function findClosestCommand(command: string, validCommands: Array<string>): string;
    export function loadFiles(dirName: string): Promise<string[]>;
  }
}

declare module 'utils' {
  export function getGithubData(username: string): Promise<false | OutputData>;
  export function logWithLabel(label: Labels, message: string): void;
  export function ModelMiddleware(model: any): void;
}

declare namespace Tools {
  export interface Tools {
    database: string;
    weebhook: string;
    client: Client;
    path: string;
  }

  export interface Tools {
    mongo(): Promise<void>;
    start(): Promise<void>;
  }
}

declare namespace Logger {
  export interface Logger {
    events: Array<keyof typeof Events>;
    client: Client;
    channel: string;
  }

  export interface Logger {
    init(): void;
  }
}
