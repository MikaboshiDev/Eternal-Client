"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = void 0;
const mongoose_1 = require("mongoose");
const node_perf_hooks_1 = require("node:perf_hooks");
const CrashUtils_1 = require("../modules/CrashUtils");
const LoggerUtils_1 = require("../modules/LoggerUtils");
class Tools {
    // Constructor to initialize the class with necessary parameters
    constructor(database, weebhook, path, client) {
        this.database = database; // Database connection string
        this.weebhook = weebhook; // Webhook URL for logging or notifications
        this.client = client; // Discord client instance
        this.path = path; // Path for AntiCrash or other purposes
        this.start(); // Starting the initialization process
    }
    // Private method to start the initialization process
    async start() {
        // Initializing AntiCrash with the client, webhook URL, and path
        await (0, CrashUtils_1.AntiCrash)({ client: this.client, webhookUrl: this.weebhook, path: this.path });
        // Calling the method to connect to the MongoDB database
        this.mongo();
    }
    // Private method to connect to the MongoDB database
    async mongo() {
        try {
            const startTime = node_perf_hooks_1.performance.now(); // Recording the start time of the connection attempt
            await (0, mongoose_1.connect)(this.database); // Connecting to the database
            const endTime = node_perf_hooks_1.performance.now(); // Recording the end time of the connection attempt
            // Logging the time taken to connect to the database with a custom label
            (0, LoggerUtils_1.logWithLabel)('custom', `Database connection took ${endTime - startTime}ms.`, 'Eternal');
        }
        catch (error) {
            // Throwing an error if the connection fails
            throw new Error(`Error connecting to the database: ${error}`);
        }
    }
}
exports.Tools = Tools;
//# sourceMappingURL=ToolsClient.js.map