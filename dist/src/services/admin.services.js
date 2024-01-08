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
const auth_constant_1 = require("../constants/auth.constant");
const not_found_error_1 = __importDefault(require("../error/not-found.error"));
const validation_error_1 = __importDefault(require("../error/validation.error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = yield bcrypt_1.default.hash(payload.password, auth_constant_1.HashPassword.SALT_ROUND);
                const existingUser = yield prisma_client_config_1.default.user.findUnique({
                    where: { email: payload.email },
                });
                if (existingUser) {
                    throw new validation_error_1.default('Email Sudah ada');
                }
                const user = yield prisma_client_config_1.default.user.create({
                    data: Object.assign(Object.assign({}, payload), { password: hashPassword }),
                });
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_client_config_1.default.user.delete({
                    where: {
                        id,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    static updateUser(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_client_config_1.default.user.update({
                    where: {
                        id,
                    },
                    data: {
                        email: payload.email,
                        password: payload.password,
                        username: payload.username,
                        fullname: payload.fullname,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    static getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_client_config_1.default.user.findMany({
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        role: true,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    static getUserDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_client_config_1.default.user.findFirst({
                    where: {
                        id,
                    },
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        role: true,
                    },
                });
                console.log('user : ', user);
                if (!user) {
                    throw new not_found_error_1.default('Not Found');
                }
                return user;
            }
            catch (error) {
                console.log('user credential error : ', error);
                throw error;
            }
        });
    }
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield prisma_client_config_1.default.user.findMany({
                    select: {
                        role: true,
                    },
                });
                return roles;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = AdminService;
