import { logWithLabel } from '../tools/console';
import { Client } from 'discord.js';
import { connect } from 'mongoose';
import axios from 'axios';

export class toolsHub {
  databaseUrl: string;
  licenceUrl: string;
  apiUrl: string;
  client: Client;
  constructor(databaseUrl: string, licenceUrl: string, apiUrl: string, client: Client) {
    this.databaseUrl = databaseUrl;
    this.licenceUrl = licenceUrl;
    this.apiUrl = apiUrl;
    this.client = client;
    this.start();
  }

  private start() {
    logWithLabel('custom', 'Starting the toolsHub class monitoring system...', 'ETERNAL');
    this.DB();
  }

  private async DB() {
    try {
      const connection = await connect(this.databaseUrl);
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
        url: this.licenceUrl,
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
