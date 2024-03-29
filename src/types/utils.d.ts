import { Client } from "discord.js";
declare module "utils" {
   export function antiCrash({ client, webhook }: { client: Client; webhook: WebhookClient }): void;
   export function logWithLabel(label: Labels, message: string): void;
   namespace handlers {
      export function handlerWhatsapp({ rute, client, extension }: { rute: string; client: Client; extension: string }): Promise<void>;
      export function handlerDiscord({ dirName, extension }: { dirName: string; extension: string }): Promise<string[]>;
      export function handlerRouter({ rute, extension }: { rute: string; extension: string }): Promise<void>;
   }
}