"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discord = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
class Discord extends discord_js_1.Client {
    constructor() {
        super({
            failIfNotExists: false,
            allowedMentions: {
                parse: ['users', 'roles'],
                repliedUser: false,
            },
            makeCache: discord_js_1.Options.cacheWithLimits({
                MessageManager: 200,
            }),
            intents: [discord_js_1.GatewayIntentBits.GuildMessages],
            partials: [discord_js_1.Partials.GuildMember],
        });
    }
    async start(token) {
        const webhook = new discord_js_1.WebhookClient({ url: '' });
        (0, index_1.antiCrash)({ webhook: webhook, client: this });
        await super.login(token);
    }
}
exports.Discord = Discord;
//# sourceMappingURL=anti-crash.test.js.map