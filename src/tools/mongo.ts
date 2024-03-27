import { logWithLabel } from '../functions/console';
import EventEmitter from 'events';

/**
 * The function `setupModelMiddleware` sets up event listeners for model changes and emits
 * corresponding events using an `EventEmitter` instance.
 * @param {any} model - The `model` parameter in the `setupModelMiddleware` function is an object
 * representing a model in a database. It seems to have methods like `watch()`, `on('change', ...)`,
 * `on('schema', ...)`, and `on('deleteSchema', ...)`. The model object is
 */
class DatabaseEventEmitter extends EventEmitter {}
const dbEventEmitter = new DatabaseEventEmitter();

export function setupModelMiddleware(model: any) {
  /* The code snippet you provided is setting up event listeners for model changes in a database using an
  `EventEmitter` instance named `dbEventEmitter`. Here's a breakdown of what each part of the code is
  doing: */
  model.watch().on('change', (change: any) => {
    logWithLabel('database', `The model ${model.modelName} has been updated with the following change`);
    dbEventEmitter.emit('update', model.modelName, change);
  });

  model.on('schema', (schema: any) => {
    logWithLabel('database', `The model ${model.modelName} has been created`);
    dbEventEmitter.emit('createModel', model.modelName);
  });

  model.on('deleteSchema', (schema: any) => {
    logWithLabel('database', `The schema ${model.modelName} has been deleted`);
    dbEventEmitter.emit('deleteSchema', model.modelName);
  });
}

dbEventEmitter.on('update', (modelName: string, documentoActualizado: any) => {
  logWithLabel('database', `The model ${modelName} has been updated with the following change`);
});

dbEventEmitter.on('createModel', (modelName: string) => {
  logWithLabel('database', `The model ${modelName} has been created`);
});

dbEventEmitter.on('deleteSchema', (schemaName: string) => {
  logWithLabel('database', `The schema ${schemaName} has been deleted`);
});
