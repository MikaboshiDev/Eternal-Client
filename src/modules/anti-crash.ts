import { Client, codeBlock, EmbedBuilder, WebhookClient } from 'discord.js';
import winston, { format } from 'winston';
import { logWithLabel } from './console';
import { inspect } from 'util';

function createField(name: string, value: unknown) {
  return { name, value: codeBlock('js', inspect(value, { depth: 0 }).slice(0, 300)) };
}

const date = `-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
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
  console.log(origin);
  console.log(err);
  return embed;
}

export function antiCrash({ client, webhookUrl, path }: { client: Client; webhookUrl: string; path: string }) {
  const webhook = new WebhookClient({ url: webhookUrl });
  const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.printf((log) => `[${log.timestamp.split('T')[1].split('.')[0]} ${log.level}] ${log.message}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new winston.transports.File({ filename: `${path}/log${date}.log` })],
    rejectionHandlers: [new winston.transports.File({ filename: `${path}/log${date}.log` })],
    exceptionHandlers: [new winston.transports.File({ filename: `${path}/log${date}.log` })],
  });

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
    logger.error(err);
    console.log(err);
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
    logger.error(reason);
    console.log(reason);
  });

  process.on('uncaughtException', (err: Error, origin) => {
    handleUncaughtException('Uncaught Exception/Catch', err, origin), logWithLabel('error', `${origin}`);
    logger.error(origin);
    console.log(origin);
  });

  process.on('uncaughtExceptionMonitor', (err: Error, origin) => {
    handleUncaughtException('Uncaught Exception Monitor', err, origin), logWithLabel('error', `${origin}`);
    logger.error(origin);
    console.log(origin);
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
    logger.warn(warning);
    console.log(warning);
  });
}
