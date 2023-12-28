"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_config_1 = __importDefault(require("../config/prisma-client.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthrized_error_1 = __importDefault(require("../error/unauthrized.error"));
const auth_constant_1 = require("../constants/auth.constant");
// import { configDotenv } from 'dotenv';
// configDotenv();
class AuthServices {
    static register(roleName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = yield bcrypt_1.default.hash(payload.password, auth_constant_1.HashPassword.SALT_ROUND);
                const user = prisma_client_config_1.default.user.create({
                    data: Object.assign(Object.assign({}, payload), { password: hashPassword, role: {
                            connect: {
                                name: roleName,
                            },
                        } }),
                });
                return user;
            }
            catch (error) {
                return error;
            }
        });
    }
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_client_config_1.default.user.findUnique({
                    where: {
                        email: payload.email,
                    },
                });
                const role = yield prisma_client_config_1.default.role.findUnique({
                    where: {
                        id: user === null || user === void 0 ? void 0 : user.roleId,
                    },
                });
                if (user) {
                    const comparePassword = yield bcrypt_1.default.compare(payload.password, user.password);
                    if (comparePassword) {
                        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: role === null || role === void 0 ? void 0 : role.name }, process.env.JWT_KEY);
                        return token;
                    }
                    throw new unauthrized_error_1.default('Email atau Password salah');
                }
                throw new unauthrized_error_1.default('Email atau Password salah');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthServices;
