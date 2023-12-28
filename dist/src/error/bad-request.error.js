"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(name, message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
    }
}
exports.default = BaseError;
