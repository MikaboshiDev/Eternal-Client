/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'discord.js';
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
