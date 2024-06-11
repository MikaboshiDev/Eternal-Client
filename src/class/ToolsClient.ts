import axios from "axios";
import chalk from "chalk";
import { Client } from "discord.js";
import mongoose, { connect } from "mongoose";
import { performance } from "node:perf_hooks";

import { CrashUtils } from "../modules/CrashUtils";
import { logWithLabel } from "../modules/LoggerUtils";
import { Data } from "../types/tools/TypesTools";

export class ToolsHub {
  private database: string;
  private weebhook: string;
  private client: Client;
  private path: string;
  constructor(database: string, weebhook: string, path: string, client: Client) {
    this.database = database;
    this.weebhook = weebhook;
    this.client = client;
    this.path = path;
    this.start();
  }

  private async start() {
    await CrashUtils({ client: this.client, webhookUrl: this.weebhook, path: this.path });
    this.MongoConnect();
  }

  /**
   * The function `mongodb` connects to a MongoDB database asynchronously and throws an error if there is
   * a connection issue.
   */
  private async MongoConnect() {
    try {
      const startTime = performance.now();
      await connect(this.database);
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function () {
        logWithLabel(
          'database',
          [
            `${chalk.cyanBright('Database')} ${chalk.grey('connected')} ${chalk.grey(`${db.host}:${db.port}`)}`,
            `  ➜  ${chalk.green('Database name')}: ${db.name}`,
            `  ➜  ${chalk.green('Database state')}: 'connected'`,
          ].join('\n')
        );
      });

      const endTime = performance.now();
      logWithLabel('custom', `Database connection took ${endTime - startTime}ms.`, 'Eternal');
    } catch (error) {
      throw new Error(`Error connecting to the database: ${error}`);
    }
  }

  /**
   * The function sends a POST request to a specified API endpoint with license and product information,
   * and returns the response data if successful.
   * @param {Data} body - The `licences` function takes a `Data` object as its parameter. The `Data`
   * object typically contains the following properties:
   * @returns If the `res.data` object has a `status_overview` property that is not equal to 'success' or
   * a `status_code` property that is not equal to 200, the function will return `false`. Otherwise, it
   * will return the `res.data` object.
   */
  public async LicenceUtil(body: Data) {
    const res = await axios({
      method: 'POST',
      url: body.api,
      data: {
        licence: body.licence,
        product: body.product.name,
        version: body.product.version,
      },
      headers: {
        Authorization: body.key,
      },
    }).catch((e) => e);

    if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
      return false;
    }

    return res.data;
  }
}
