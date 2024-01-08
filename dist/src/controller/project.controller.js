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
        var _a, _b, _c, _d, _e, _f;
        try {
            const payload = req.body;
            const image = (((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) && ((_c = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image[0]) === null || _c === void 0 ? void 0 : _c.filename)) || undefined;
            const projectIcon = (((_d = req.files) === null || _d === void 0 ? void 0 : _d.projectIcon) && ((_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e.projectIcon[0]) === null || _f === void 0 ? void 0 : _f.filename)) ||
                undefined;
            const project = yield project_services_1.default.createProject(Object.assign(Object.assign({}, payload), { image,
                projectIcon }));
            return res.json({
                message: 'Berhasil membuat project',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: project,
            });
        }
        catch (error) {
            console.log('error : ', error);
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
            console.log('error : ', error);
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
        var _g, _h, _j, _k, _l, _m;
        try {
            const id = req.params.id;
            const payload = req.body;
            const image = (((_g = req.files) === null || _g === void 0 ? void 0 : _g.image) && ((_j = (_h = req.files) === null || _h === void 0 ? void 0 : _h.image[0]) === null || _j === void 0 ? void 0 : _j.filename)) || undefined;
            const projectIcon = (((_k = req.files) === null || _k === void 0 ? void 0 : _k.projectIcon) && ((_m = (_l = req.files) === null || _l === void 0 ? void 0 : _l.projectIcon[0]) === null || _m === void 0 ? void 0 : _m.filename)) ||
                undefined;
            console.log('image name : ', image);
            const project = yield project_services_1.default.updateProject(id, Object.assign(Object.assign({}, payload), { price: Number(payload.price), image,
                projectIcon }));
            return res.json({
                message: 'Berhasil mengupdate project',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: project,
            });
        }
        catch (error) {
            console.log(error);
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
