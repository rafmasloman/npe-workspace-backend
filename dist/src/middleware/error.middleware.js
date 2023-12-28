"use strict";
// class ErroHandler extends Error {
//   statusCode: number;
//   name: string;
//   constructor(name: string, message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = name;
//   }
// }
// export default ErroHandler;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../error/bad-request.error"));
const ErrorHandler = (err, req, res, next) => {
    const statusCode = err instanceof bad_request_error_1.default ? err.statusCode : 500;
    const message = err instanceof bad_request_error_1.default ? err.message : 'Internal Server Error';
    return res.status(statusCode).json({
        name: err.name,
        message: message,
    });
};
exports.default = ErrorHandler;
