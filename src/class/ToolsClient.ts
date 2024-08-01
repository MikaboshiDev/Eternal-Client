import { Client } from "discord.js";
import { connect } from "mongoose";
import { performance } from "node:perf_hooks";

import { AntiCrash } from "../modules/CrashUtils";
import { logWithLabel } from "../modules/LoggerUtils";

export class Tools {
  private database: string;
  private weebhook: string;
  private client: Client;
  private path: string;

  // Constructor to initialize the class with necessary parameters
  constructor(database: string, weebhook: string, path: string, client: Client) {
    this.database = database; // Database connection string
    this.weebhook = weebhook; // Webhook URL for logging or notifications
    this.client = client; // Discord client instance
    this.path = path; // Path for AntiCrash or other purposes
    this.start(); // Starting the initialization process
  }

  // Private method to start the initialization process
  private async start() {
    // Initializing AntiCrash with the client, webhook URL, and path
    await AntiCrash({ client: this.client, webhookUrl: this.weebhook, path: this.path });
    // Calling the method to connect to the MongoDB database
    this.mongo();
  }

  // Private method to connect to the MongoDB database
  private async mongo() {
    try {
      const startTime = performance.now(); // Recording the start time of the connection attempt
      await connect(this.database); // Connecting to the database
      const endTime = performance.now(); // Recording the end time of the connection attempt
      // Logging the time taken to connect to the database with a custom label
      logWithLabel('custom', `Database connection took ${endTime - startTime}ms.`, 'Eternal');
    } catch (error) {
      // Throwing an error if the connection fails
      throw new Error(`Error connecting to the database: ${error}`);
    }
  }
}
