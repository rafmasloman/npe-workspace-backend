"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const comment_controller_1 = __importDefault(require("../controller/comment.controller"));
const commentRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, comment_controller_1.default.getAllComments);
    router.post('/', auth_middleware_1.default, comment_controller_1.default.createComment);
    return router;
};
exports.default = commentRouter;
