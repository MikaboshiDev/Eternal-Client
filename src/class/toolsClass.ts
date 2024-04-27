import { logWithLabel } from '../tools/console';
import { Client } from 'discord.js';
import { connect } from 'mongoose';
import axios from 'axios';

export class toolsHub {
  database: string;
  urlLicence: string;
  clientDC: Client;
  constructor(database: string, urlLicence: string, clientDC: Client) {
    this.urlLicence = urlLicence;
    this.database = database;
    this.clientDC = clientDC;
    this.start();
  }

  private start() {
    logWithLabel("custom", "ETERNAL", "Starting the toolsHub class monitoring system...");
    this.DB();
  }

  private async DB() {
    try {
      const connection = await connect(this.database);
      logWithLabel(
        'database',
        [
          `Connected to the database: ${connection.connection.name}`,
          `Collections: ${connection.connection.collections}`,
          `State: ${connection.connection.readyState}`,
          `Host: ${connection.connection.host}`,
        ].join('\n')
      );
    } catch (error) {
      logWithLabel('error', `Error connecting to the database: ${error}`);
      console.error(error);
    }
  }

  public async getLicence(API_KEY: string, version: string, product: string, licence: string) {
    try {
      const res = await axios({
        method: 'POST',
        url: this.urlLicence,
        data: {
          licence: licence,
          product: product,
          version: version,
        },
        headers: {
          Authorization: API_KEY,
        },
      });

      if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
        return false;
      }

      return res.data;
    } catch (error) {
      logWithLabel('error', `Error getting the licence: ${error}`);
      console.error(error);
    }
  }
}
