import { Client, codeBlock, EmbedBuilder, WebhookClient } from 'discord.js';
import { inspect } from 'util';
import { logWithLabel } from './console';

function createField(name: string, value: unknown) {
  return { name, value: codeBlock('js', inspect(value, { depth: 0 }).slice(0, 300)) };
}

function handleUncaughtException(event: string | null, err: unknown, origin: unknown) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `Function handleUncaughtException - ${event}`,
    })
    .setColor('Red')
    .setTimestamp()
    .setTitle(event)
    .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
    .setFields(createField('Error', err), createField('Origin', origin));

  logWithLabel('error', `${origin}`);
  logWithLabel('error', `${err}`);

  return embed;
}

export function antiCrash({ client, webhook }: { client: Client; webhook: WebhookClient }) {
  client.on('error', (err: Error) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Function AntiCrash - ${client.user?.username}`,
        iconURL: client.user?.displayAvatarURL(),
      })
      .setColor('Red')
      .setTimestamp()
      .setFields(createField('Error', err))
      .setTitle('Discord API Error')
      .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors');

    webhook.send({ embeds: [embed] });
    logWithLabel('error', `${err}`);
  });

  process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Function AntiCrash - ${client.user?.username}`,
        iconURL: client.user?.displayAvatarURL(),
      })
      .setColor('Red')
      .setTimestamp()
      .setTitle('Unhandled Rejection/Catch')
      .setFields(createField('Reason', reason), createField('Promise', promise))
      .setURL('https://nodejs.org/api/process.html#event-unhandledrejection');

    webhook.send({ embeds: [embed] });
    logWithLabel('error', `${reason}`);
  });

  process.on('uncaughtException', (err: Error, origin) => {
    handleUncaughtException('Uncaught Exception/Catch', err, origin), logWithLabel('error', `${origin}`);
  });

  process.on('uncaughtExceptionMonitor', (err: Error, origin) => {
    handleUncaughtException('Uncaught Exception Monitor', err, origin), logWithLabel('error', `${origin}`);
  });

  process.on('warning', (warning: Error) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Function AntiCrash - ${client.user?.username}`,
        iconURL: client.user?.displayAvatarURL(),
      })
      .setColor('Red')
      .setTimestamp()
      .setFields(createField('Warning', warning))
      .setTitle('Warning')
      .setURL('https://nodejs.org/api/process.html#event-warning');

    webhook.send({ embeds: [embed] });
    logWithLabel('error', `${warning}`);
  });
}
