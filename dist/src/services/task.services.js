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
class TaskService {
    static createTask(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('task : ', payload);
            try {
                const task = yield prisma_client_config_1.default.task.create({
                    data: Object.assign(Object.assign({}, payload), { member: {
                            connect: payload.member.map((memberId) => ({
                                id: memberId,
                            })),
                        }, projectId: payload.projectId, milestoneId: payload.milestoneId }),
                    include: {
                        project: true,
                        member: {
                            include: {
                                user: true,
                            },
                        },
                    },
                });
                return task;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllTask() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield prisma_client_config_1.default.task.findMany({
                    include: {
                        project: true,
                        member: {
                            include: {
                                user: true,
                            },
                        },
                        milestone: true,
                    },
                });
                return tasks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getTaskDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield prisma_client_config_1.default.task.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        project: {
                            select: {
                                projectName: true,
                                image: true,
                            },
                        },
                    },
                });
                if (!task) {
                    throw new not_found_error_1.default('Task tidak ditemukan');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findTask = yield prisma_client_config_1.default.task.findUnique({
                    where: {
                        id,
                    },
                });
                if (!findTask) {
                    throw new not_found_error_1.default('Task tidak ditemukan');
                }
                const task = yield prisma_client_config_1.default.task.delete({
                    where: {
                        id,
                    },
                });
                return task;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateTask(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findTask = yield prisma_client_config_1.default.task.findUnique({
                    where: {
                        id,
                    },
                });
                if (!findTask) {
                    throw new not_found_error_1.default('Task tidak ditemukan');
                }
                const task = yield prisma_client_config_1.default.task.update({
                    where: {
                        id,
                    },
                    data: Object.assign(Object.assign({}, payload), { member: {
                            connect: payload.member.map((memberId) => ({
                                id: memberId,
                            })),
                        }, projectId: payload.projectId, milestoneId: payload.milestoneId }),
                });
                return task;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TaskService;
