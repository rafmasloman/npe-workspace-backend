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
class MilestoneService {
    static createMilestone(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const milestone = yield prisma_client_config_1.default.milestone.create({
                    data: Object.assign(Object.assign({}, payload), { projectId: payload.projectId }),
                });
                return milestone;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllMilestones() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const milestones = yield prisma_client_config_1.default.milestone.findMany();
                return milestones;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getMilestoneById(milestoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const milestone = yield prisma_client_config_1.default.milestone.findFirst({
                    where: {
                        id: milestoneId,
                    },
                });
                if (!milestone) {
                    throw not_found_error_1.default;
                }
                return milestone;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateMilestone(milestoneId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getMilestone = yield prisma_client_config_1.default.milestone.findFirst({
                    where: {
                        id: milestoneId,
                    },
                });
                if (!getMilestone) {
                    throw not_found_error_1.default;
                }
                const milestone = yield prisma_client_config_1.default.milestone.update({
                    where: {
                        id: milestoneId,
                    },
                    data: Object.assign(Object.assign({}, payload), { projectId: payload.projectId }),
                });
                return milestone;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteMilestone(milestoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const milestone = yield prisma_client_config_1.default.milestone.delete({
                    where: {
                        id: milestoneId,
                    },
                });
                return milestone;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MilestoneService;
