"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = exports.responseCodes = exports.GET_ALL_RESPONSE_SUCCESS_CODE = exports.CREATE_RESPONSE_SUCCESS_CODE = void 0;
exports.CREATE_RESPONSE_SUCCESS_CODE = 201;
exports.GET_ALL_RESPONSE_SUCCESS_CODE = 200;
exports.responseCodes = {
    SUCCESS_CREATE: 201,
    SUCCESS_FIND_ALL: 200,
    ERROR_NOT_FOUND: 404,
    ERROR: 500,
};
exports.HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};
