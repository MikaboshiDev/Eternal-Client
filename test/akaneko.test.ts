import { sfw } from "../src/index";
async function request() {
   console.log(await sfw.mobileWallpapers())
}

request();