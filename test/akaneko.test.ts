import { sfw } from '../index';
async function request() {
  console.log(await sfw.mobileWallpapers());
}

request();
