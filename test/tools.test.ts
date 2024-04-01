import { Client } from 'discord.js';
import { ApiTools } from '../index';

const client = new Client({
  intents: [],
  partials: [],
});

function registerApp() {
  const res = new ApiTools('http://www.night-support.xyz/api/v1', client);
  res
    .postAppWeb({
      description: '',
      iconURL: '',
      ownerId: '',
      licence: 'MIT',
      email: '',
      supportServer: 'http://discord.night-support.xyz',
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

registerApp;
