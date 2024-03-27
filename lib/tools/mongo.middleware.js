"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModelMiddleware = void 0;
const console_1 = require("../functions/console");
const events_1 = __importDefault(require("events"));
/**
 * The function `setupModelMiddleware` sets up event listeners for model changes and emits
 * corresponding events using an `EventEmitter` instance.
 * @param {any} model - The `model` parameter in the `setupModelMiddleware` function is an object
 * representing a model in a database. It seems to have methods like `watch()`, `on('change', ...)`,
 * `on('schema', ...)`, and `on('deleteSchema', ...)`. The model object is
 */
class DatabaseEventEmitter extends events_1.default {
}
const dbEventEmitter = new DatabaseEventEmitter();
function setupModelMiddleware(model) {
    /* The code snippet you provided is setting up event listeners for model changes in a database using an
    `EventEmitter` instance named `dbEventEmitter`. Here's a breakdown of what each part of the code is
    doing: */
    model.watch().on('change', (change) => {
        (0, console_1.logWithLabel)('database', `The model ${model.modelName} has been updated with the following change`);
        dbEventEmitter.emit('update', model.modelName, change);
    });
    model.on('schema', (schema) => {
        (0, console_1.logWithLabel)('database', `The model ${model.modelName} has been created`);
        dbEventEmitter.emit('createModel', model.modelName);
    });
    model.on('deleteSchema', (schema) => {
        (0, console_1.logWithLabel)('database', `The schema ${model.modelName} has been deleted`);
        dbEventEmitter.emit('deleteSchema', model.modelName);
    });
}
exports.setupModelMiddleware = setupModelMiddleware;
dbEventEmitter.on('update', (modelName, documentoActualizado) => {
    (0, console_1.logWithLabel)('database', `The model ${modelName} has been updated with the following change`);
});
dbEventEmitter.on('createModel', (modelName) => {
    (0, console_1.logWithLabel)('database', `The model ${modelName} has been created`);
});
dbEventEmitter.on('deleteSchema', (schemaName) => {
    (0, console_1.logWithLabel)('database', `The schema ${schemaName} has been deleted`);
});
//# sourceMappingURL=mongo.middleware.js.map