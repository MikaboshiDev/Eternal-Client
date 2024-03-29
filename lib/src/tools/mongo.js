"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModelMiddleware = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const console_1 = require("../functions/console");
const events_1 = __importDefault(require("events"));
class DatabaseEventEmitter extends events_1.default {
}
const dbEventEmitter = new DatabaseEventEmitter();
function setupModelMiddleware(model) {
    model.watch().on('change', (change) => {
        (0, console_1.logWithLabel)('database', `The model ${model.modelName} has been updated with the following change`);
        dbEventEmitter.emit('update', model.modelName, change);
    });
    model.on('schema', () => {
        (0, console_1.logWithLabel)('database', `The model ${model.modelName} has been created`);
        dbEventEmitter.emit('createModel', model.modelName);
    });
    model.on('deleteSchema', () => {
        (0, console_1.logWithLabel)('database', `The schema ${model.modelName} has been deleted`);
        dbEventEmitter.emit('deleteSchema', model.modelName);
    });
}
exports.setupModelMiddleware = setupModelMiddleware;
dbEventEmitter.on('update', (modelName) => {
    (0, console_1.logWithLabel)('database', `The model ${modelName} has been updated with the following change`);
});
dbEventEmitter.on('createModel', (modelName) => {
    (0, console_1.logWithLabel)('database', `The model ${modelName} has been created`);
});
dbEventEmitter.on('deleteSchema', (schemaName) => {
    (0, console_1.logWithLabel)('database', `The schema ${schemaName} has been deleted`);
});
//# sourceMappingURL=mongo.js.map