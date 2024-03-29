import { Client, GatewayIntentBits, Options, Partials, WebhookClient } from 'discord.js';
import { antiCrash } from '../src/index';

export class Discord extends Client {
  constructor() {
    super({
      failIfNotExists: false,
      allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false,
      },
      makeCache: Options.cacheWithLimits({
        MessageManager: 200,
      }),
      intents: [GatewayIntentBits.GuildMessages],
      partials: [Partials.GuildMember],
    });
  }

  public async start(token: string) {
    const webhook = new WebhookClient({ url: '' });
    antiCrash({ webhook: webhook, client: this });
    await super.login(token);
  }
}
