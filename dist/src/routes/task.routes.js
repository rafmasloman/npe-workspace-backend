"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const task_controller_1 = __importDefault(require("../controller/task.controller"));
const taskRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, task_controller_1.default.getAllTask);
    router.get('/:id', auth_middleware_1.default, task_controller_1.default.getTaskDetail);
    router.post('/', auth_middleware_1.default, task_controller_1.default.createTask);
    router.put('/:id', auth_middleware_1.default, task_controller_1.default.updateTask);
    router.delete('/:id', auth_middleware_1.default, task_controller_1.default.deleteTask);
    return router;
};
exports.default = taskRouter;
