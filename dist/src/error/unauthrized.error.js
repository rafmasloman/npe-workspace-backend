"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_constant_1 = require("../constants/responses.constant");
const bad_request_error_1 = __importDefault(require("./bad-request.error"));
class UnauthorizedError extends bad_request_error_1.default {
    constructor(message) {
        super('Unauthorized', message, responses_constant_1.HttpStatusCode.UNAUTHORIZED);
    }
}
exports.default = UnauthorizedError;
