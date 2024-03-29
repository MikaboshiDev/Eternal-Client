"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
async function request() {
    const neko = new index_1.NekoClient();
    console.log(await neko.hug());
}
request();
//# sourceMappingURL=nekos.test.js.map