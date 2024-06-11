/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";

type Labels =
  | 'error'
  | 'success'
  | 'api'
  | 'multihub'
  | 'website'
  | 'debug'
  | 'express'
  | 'bots'
  | 'info'
  | 'database'
  | 'whatsapp'
  | "shards"
  | 'discord'
  | 'maintenance';

/* --- Define colors for log labels --- */
const labelColors: Record<Labels, chalk.Chalk> = {
  error: chalk.redBright,
  success: chalk.greenBright,
  debug: chalk.magentaBright,
  express: chalk.blueBright,
  bots: chalk.cyanBright,
  api: chalk.hex('#ff0080'),
  multihub: chalk.hex('#FFA500'),
  website: chalk.yellowBright,
  info: chalk.blueBright,
  database: chalk.hex('#FF00FF'),
  whatsapp: chalk.hex('#25D366'),
  discord: chalk.hex('#80fe72'),
  maintenance: chalk.hex('#FFA500'),
  shards: chalk.hex('#FFA500'),
};

/* --- Define labels for log messages --- */
const labelNames: Record<Labels, string> = {
  error: 'Error',
  success: 'Success',
  debug: 'Debug',
  express: 'Express',
  bots: 'Bots',
  api: 'Api',
  multihub: 'MultiHub',
  website: 'Website',
  info: 'Info',
  database: 'Database',
  whatsapp: 'WhatsApp',
  discord: 'Discord',
  maintenance: 'Maintenance',
  shards: 'Shards',
};

/**
 * The function `logWithLabel` logs a message with a specified label and sends it to a Discord webhook.
 * @param {Labels | 'custom'} label - The `label` parameter in the `logWithLabel` function is used to specify the
 * type or category of the log message being logged. It is of type `Labels`, which likely is an enum or
 * a defined set of possible values representing different labels or categories for the log message.
 * @param {string} message - The `message` parameter in the `logWithLabel` function is a string that
 * represents the actual message or content that you want to log with a specific label. It could be any
 * information, warning, error, or status update that you want to display along with the label.
 * @param {string} [customName] - The `customName` parameter allows specifying a custom label name.
 * @param {string} [customColor] - The `customColor` parameter allows specifying a custom color for the label.
 */

export function logWithLabel(label: Labels | 'custom', message: string, customName?: string) {
  if (label === 'custom' && customName === undefined) {
    throw new Error('Custom label name must be provided when using the custom label type.');
  }

  let labelName: string;
  let labelColor: chalk.Chalk;

  if (label === 'custom') {
    labelName = customName!;
    labelColor = chalk.hex('#5c143b');
  } else {
    labelName = labelNames[label];
    labelColor = labelColors[label];
  }
  /* --- Log message to console --- */
  const _getLogOrigin = () => {
    let filename: any;

    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };
    try {
      /* The code snippet you provided is a part of the `_getLogOrigin` function in your TypeScript file.
This function is responsible for determining the origin or source file of the log message being
processed. Here's a breakdown of what the code is doing: */
      const err: any = new Error();
      let callerfile: string;

      const currentfile: string = err.stack.shift().getFileName();

      while (err.stack.length) {
        callerfile = err.stack.shift().getFileName();

        if (currentfile !== callerfile) {
          filename = callerfile;
          break;
        }
      }
    } catch (err) {
      throw new Error(err as string);
    }
    Error.prepareStackTrace = _pst;

    return filename;
  };

  /**
   * The `_getLogOrigin` function is a helper function that retrieves the origin or source of the log
   * message. It uses the `Error.prepareStackTrace` method to get the stack trace and extract the file
   * name of the calling file. This is used to determine the origin of the log message.
   * @returns {string} - The file name of the calling file, which is used as the origin of the log message.
   */
  const origin = _getLogOrigin().split(/[\\/]/).pop();
  const time = new Date().toLocaleTimeString();
  console.log(
    labelColor(`${labelName.padEnd(10, ' ')} -> `) +
      chalk.hex('#ffffbf')('💻 Assistent Bookshop ~ ') +
      chalk.grey(`${origin.length > 15 ? origin.substring(0, 17) + '...' : origin}`) +
      ' '.repeat(25 - (origin.length > 15 ? 15 : origin.length)) +
      `${chalk.hex('#386ce9')(`[${time}]`)}` +
      `\n  ➜  ${message}`
  );
}
