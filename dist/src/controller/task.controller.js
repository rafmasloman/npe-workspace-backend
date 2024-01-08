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
const task_services_1 = __importDefault(require("../services/task.services"));
const responses_constant_1 = require("../constants/responses.constant");
const TaskController = {
    createTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const { name, projectId, member, milestoneId } = req.body;
            const task = yield task_services_1.default.createTask({
                name,
                projectId,
                member,
            });
            return res.json({
                message: 'Berhasil membuat task',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: task,
            });
        }
        catch (error) {
            console.log('error controller : ', error);
            next(error);
        }
    }),
    getAllTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield task_services_1.default.getAllTask();
            console.log('tasks : ', tasks);
            return res.json({
                message: 'Berhasil mendapatkan semua data task',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: tasks,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getTaskDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const task = yield task_services_1.default.getTaskDetail(id);
            return task;
        }
        catch (error) {
            next(error);
        }
    }),
    updateTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const payload = req.body;
            const task = yield task_services_1.default.updateTask(Number(id), payload);
            return res.json({
                message: 'Berhasil mengupdate task',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: task,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const task = yield task_services_1.default.deleteTask(Number(id));
            return res.json({
                message: 'Berhasil menghapus task',
                statusCode: responses_constant_1.HttpStatusCode.OK,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = TaskController;
