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
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminService {
    static createUser(roleID, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRole = yield prisma_client_config_1.default.role.findUnique({
                    where: {
                        id: roleID,
                    },
                });
                const hashPassword = yield bcrypt_1.default.hash(payload.password, auth_constant_1.HashPassword.SALT_ROUND);
                const user = yield prisma_client_config_1.default.user.create({
                    data: Object.assign(Object.assign({}, payload), { password: hashPassword, roleId: userRole === null || userRole === void 0 ? void 0 : userRole.id }),
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
                    data: payload,
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
                    include: {
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
                const user = yield prisma_client_config_1.default.user.findUnique({
                    where: {
                        id,
                    },
                });
                if (!user) {
                    throw new not_found_error_1.default('Not Found');
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield prisma_client_config_1.default.role.findMany();
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
