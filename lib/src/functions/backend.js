"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternalBackend = void 0;
const console_1 = require("../modules/console");
const EternalBackend = {
    handleServerError: function (res, error) {
        res.status(500).json({
            status: false,
            message: 'INTERNAL SERVER ERROR',
            data: error?.message,
        });
    },
    morganMiddleware: function (res, req, next) {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            (0, console_1.logWithLabel)('api', `${req.method} ${req.path} ${res.statusCode} - ${duration / 1000 / 60} minutes`);
        });
        next();
    },
};
exports.EternalBackend = EternalBackend;
//# sourceMappingURL=backend.js.map