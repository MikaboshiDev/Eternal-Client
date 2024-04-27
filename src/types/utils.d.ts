/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "discord.js";
declare module "utils" {
   export function antiCrash({ client, webhook, path }: { client: Client; webhook: WebhookClient; path: string }): void;
   export function logWithLabel(label: Labels, message: string): void;
}

declare namespace mcStatus {
   export interface McStatus {
      type: string;
      ip: string;
   }

   export interface McStatus {
      getStatus(): Promise<any | boolean>;
   }
}