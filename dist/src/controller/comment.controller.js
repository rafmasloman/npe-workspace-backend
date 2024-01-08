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
const comment_services_1 = __importDefault(require("../services/comment.services"));
const responses_constant_1 = require("../constants/responses.constant");
const commentController = {
    createComment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { message, userId, taskId } = req.body;
        try {
            const comment = yield comment_services_1.default.createComments({
                message,
                userId,
                taskId,
            });
            return res.json({
                message: 'Berhasil menambah komentar',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: comment,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getAllComments: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { taskId } = req.body;
        try {
            const comments = yield comment_services_1.default.getAllComments({ taskId });
            return res.json({
                message: 'Berhasil mendapatkan semua data komentar',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: comments,
            });
        }
        catch (error) {
            console.log('get comments : ', error);
            next(error);
        }
    }),
};
exports.default = commentController;
