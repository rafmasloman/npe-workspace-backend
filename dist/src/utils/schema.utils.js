"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(6).max(20).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi_1.default.string().email().required(),
    fullname: joi_1.default.string().max(100).required(),
    role: joi_1.default.string().valid('ADMIN', 'STAFF', 'PROJECT_MANAGER').required(),
    memberId: joi_1.default.string(),
});
