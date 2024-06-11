"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternalBackend = void 0;
const EternalBackend = {
    handleServerError: function (res, error) {
        res.status(500).json({
            status: false,
            message: 'INTERNAL SERVER ERROR',
            data: error?.message,
        });
    }
};
exports.EternalBackend = EternalBackend;
//# sourceMappingURL=FuncApi.js.map