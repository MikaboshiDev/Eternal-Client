import { NekoClient } from '../index';
async function request() {
  const neko = new NekoClient();
  console.log(await neko.hug());
}

request();
