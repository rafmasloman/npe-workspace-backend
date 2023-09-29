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
const project_services_1 = __importDefault(require("../services/project.services"));
const responses_constant_1 = require("../constants/responses.constant");
const projectController = {
    createProject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectName, description, startedDate, endDate, price, image, clientId, taskId, } = req.body;
            const project = yield project_services_1.default.createProject({
                projectName,
                description,
                startedDate,
                endDate,
                price,
                image,
                clientId,
                taskId,
            });
            return res.json({
                message: 'Berhasil membuat project',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getAllProject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projects = yield project_services_1.default.getAllProject();
            return res.json({
                message: 'Berhasil mendapatkan semua data project',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: projects,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getProjectDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const project = yield project_services_1.default.getProjetDetail(id);
            return res.json({
                message: 'Berhasil mendapatkan detail project',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateProject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { projectName, description, startedDate, endDate, price, image, clientId, taskId, } = req.body;
            const project = yield project_services_1.default.updateProject(id, {
                projectName,
                description,
                startedDate,
                endDate,
                price,
                image,
                clientId,
                taskId,
            });
            return res.json({
                message: 'Berhasil mengupdate project',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteProject: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const project = yield project_services_1.default.deleteProject(id);
            return res.json({
                message: 'Berhasil menghapus project',
                statusCode: responses_constant_1.HttpStatusCode.OK,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = projectController;
