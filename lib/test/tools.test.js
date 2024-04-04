"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const client = new discord_js_1.Client({
    intents: [],
    partials: [],
});
function registerApp() {
    const res = new index_1.ApiTools('http://www.night-support.xyz/api/v1', client);
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
//# sourceMappingURL=tools.test.js.map