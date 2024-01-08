"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseType = {
    successResponse: ({ statusCode, message, data }) => {
        const response = {
            statusCode,
            message,
            data,
        };
        return response;
    },
};
exports.default = responseType;
