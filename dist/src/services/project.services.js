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
class ProjectService {
    static createProject(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield prisma_client_config_1.default.project.create({
                    data: Object.assign(Object.assign({}, payload), { price: Number(payload.price), memberId: payload.memberId, clientId: payload.clientId }),
                });
                return project;
            }
            catch (error) {
                console.log('error : ', error);
                throw error;
            }
        });
    }
    static getAllProject() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield prisma_client_config_1.default.project.findMany();
                return projects;
            }
            catch (error) {
                console.log('error : ', error);
                throw error;
            }
        });
    }
    static getProjetDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield prisma_client_config_1.default.project.findUnique({
                    where: {
                        id,
                    },
                });
                if (!project) {
                    throw new not_found_error_1.default('Invalid id project');
                }
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateProject(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield prisma_client_config_1.default.project.update({
                    where: {
                        id,
                    },
                    data: Object.assign({}, payload),
                });
                return project;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield prisma_client_config_1.default.project.delete({
                    where: {
                        id,
                    },
                });
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static inviteMember(projectId, memberId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield prisma_client_config_1.default.member.findUnique({
                    where: {
                        id: memberId,
                    },
                });
                if (!member) {
                    throw new not_found_error_1.default('Member not found');
                }
                const project = yield prisma_client_config_1.default.project.update({
                    where: {
                        id: projectId,
                    },
                    data: {
                        memberId,
                    },
                });
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProjectService;
