"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelMiddleware = void 0;
const events_1 = __importDefault(require("events"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const LoggerUtils_1 = require("./LoggerUtils");
/* The class `DatabaseEventEmitter` extends the `EventEmitter` class in TypeScript. */
class DatabaseEventEmitter extends events_1.default {
}
const dbEventEmitter = new DatabaseEventEmitter();
/**
 * The function `setupModelMiddleware` sets up event listeners for model changes and emits
 * corresponding events.
 * @param {any} model - The `model` parameter in the `setupModelMiddleware` function is an object that
 * represents a database model. It seems to have methods like `watch()`, `on()`, and properties like
 * `modelName`. The function sets up event listeners for changes, schema creation, and schema deletion
 * on this model
 */
function ModelMiddleware(model) {
    model.watch().on('change', (change) => {
        (0, LoggerUtils_1.logWithLabel)('database', `The model ${model.modelName} has been updated with the following change`);
        dbEventEmitter.emit('update', model.modelName, change);
    });
    model.on('schema', () => {
        (0, LoggerUtils_1.logWithLabel)('database', `The model ${model.modelName} has been created`);
        dbEventEmitter.emit('createModel', model.modelName);
    });
    model.on('deleteSchema', () => {
        (0, LoggerUtils_1.logWithLabel)('database', `The schema ${model.modelName} has been deleted`);
        dbEventEmitter.emit('deleteSchema', model.modelName);
    });
}
exports.ModelMiddleware = ModelMiddleware;
dbEventEmitter.on('update', (modelName) => {
    (0, LoggerUtils_1.logWithLabel)('database', `The model ${modelName} has been updated with the following change`);
});
dbEventEmitter.on('createModel', (modelName) => {
    (0, LoggerUtils_1.logWithLabel)('database', `The model ${modelName} has been created`);
});
dbEventEmitter.on('deleteSchema', (schemaName) => {
    (0, LoggerUtils_1.logWithLabel)('database', `The schema ${schemaName} has been deleted`);
});
//# sourceMappingURL=MongoUtils.js.map