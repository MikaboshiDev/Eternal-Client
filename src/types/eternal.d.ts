import { Client } from "discord.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'eternal' {
  export async function animeClient(): Promise<void>;
  export function mangaClient(): Promise<void>;
  namespace EternalBackend {
    export function handleServerError(res: Response, error: Error | any): void;
  }

  namespace EternalDiscord {
    export function findClosestCommand(command: string, validCommands: Array<string>): string;
    export function loadFiles(dirName: string): Promise<string[]>;
  }
}

declare module 'utils' {
  export function logWithLabel(label: Labels, message: string): void;
}

declare namespace ToolsHub {
  export interface ToolsHub {
    database: string;
    weebhook: string;
    clientDC: Client;
    path: string;
  }

  export interface ToolsHub {
    licences(body: Data): Promise<boolean>;
    mongodb(): Promise<void>;
    start(): Promise<void>;
  }
}

declare namespace DiscordLogger {
  export interface DiscordLogger {
    events: Array<keyof typeof Events>;
    client: Client;
    channel: string;
  }

  export interface DiscordLogger {
    init(): void;
  }
}
