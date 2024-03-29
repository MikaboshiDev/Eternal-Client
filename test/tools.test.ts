import { ApiTools } from '../src/index';
const client = "YOUR_CLIENT"

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
      return data
    })
    .catch((err) => {
      throw new Error(err);
    });
}

registerApp