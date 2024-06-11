declare const EternalDiscord: {
    findClosestCommand: (command: string, validCommands: Array<string>) => string;
    loadFiles: (dirName: string) => Promise<string[]>;
};
export { EternalDiscord };
