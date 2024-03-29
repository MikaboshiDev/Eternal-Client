/* eslint-disable @typescript-eslint/no-explicit-any */
import { logWithLabel } from '../functions/console';
import EventEmitter from 'events';

class DatabaseEventEmitter extends EventEmitter {}
const dbEventEmitter = new DatabaseEventEmitter();

export function setupModelMiddleware(model: any) {
  model.watch().on('change', (change: any) => {
    logWithLabel('database', `The model ${model.modelName} has been updated with the following change`);
    dbEventEmitter.emit('update', model.modelName, change);
  });

  model.on('schema', () => {
    logWithLabel('database', `The model ${model.modelName} has been created`);
    dbEventEmitter.emit('createModel', model.modelName);
  });

  model.on('deleteSchema', () => {
    logWithLabel('database', `The schema ${model.modelName} has been deleted`);
    dbEventEmitter.emit('deleteSchema', model.modelName);
  });
}

dbEventEmitter.on('update', (modelName: string) => {
  logWithLabel('database', `The model ${modelName} has been updated with the following change`);
});

dbEventEmitter.on('createModel', (modelName: string) => {
  logWithLabel('database', `The model ${modelName} has been created`);
});

dbEventEmitter.on('deleteSchema', (schemaName: string) => {
  logWithLabel('database', `The schema ${schemaName} has been deleted`);
});
