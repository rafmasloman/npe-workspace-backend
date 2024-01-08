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
const not_found_error_1 = __importDefault(require("../error/not-found.error"));
class MemberService {
    static createMember(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield prisma_client_config_1.default.member.create({
                    data: Object.assign(Object.assign({}, payload), { userId: payload.userId }),
                    include: {
                        user: true,
                    },
                });
                return member;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllMember() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield prisma_client_config_1.default.member.findMany({
                    include: {
                        payroll: {
                            include: {
                                project: true,
                            },
                        },
                        task: true,
                        user: true,
                    },
                });
                return members;
            }
            catch (error) {
                console.log('member get all error : ', error);
                throw error;
            }
        });
    }
    static getMemberDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield prisma_client_config_1.default.member.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        payroll: {
                            include: {
                                project: true,
                            },
                        },
                        task: true,
                    },
                });
                if (!member) {
                    return member;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateMember(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findMember = yield prisma_client_config_1.default.member.findUnique({
                    where: {
                        id,
                    },
                });
                if (!findMember) {
                    throw new not_found_error_1.default('Member not found');
                }
                const member = yield prisma_client_config_1.default.member.update({
                    where: {
                        id,
                    },
                    data: Object.assign({}, payload),
                });
                return member;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findMember = yield prisma_client_config_1.default.member.findUnique({
                    where: {
                        id,
                    },
                });
                if (!findMember) {
                    throw new not_found_error_1.default('Member not found');
                }
                const member = yield prisma_client_config_1.default.member.delete({
                    where: {
                        id,
                    },
                });
                return member;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MemberService;
