import { Guild, GuildMember } from "discord.js";
declare const Discord: {
    findClosestCommand: (command: string, validCommands: Array<string>) => string;
    loadFiles: (dirName: string) => Promise<string[]>;
    getFiles: (requestedPath: string, allowedExtensions?: string[]) => Promise<string[]>;
    parse: (content: string, member: GuildMember, guild: Guild) => Promise<string>;
};
export { Discord };
