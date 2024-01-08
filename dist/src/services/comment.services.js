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
class CommentService {
    static createComments(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield prisma_client_config_1.default.comment.create({
                    data: Object.assign(Object.assign({}, payload), { userId: payload.userId, taskId: payload.taskId }),
                    include: {
                        task: true,
                        user: true,
                    },
                });
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllComments({ taskId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = prisma_client_config_1.default.comment.findMany({
                    // where: {
                    //   taskId,
                    //   userId,
                    // },
                    include: {
                        user: {
                            select: {
                                fullname: true,
                                member: {
                                    select: {
                                        position: true,
                                    },
                                },
                            },
                        },
                    },
                });
                return comments;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CommentService;
