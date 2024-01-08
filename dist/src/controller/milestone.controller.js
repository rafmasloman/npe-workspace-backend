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
const milestone_services_1 = __importDefault(require("../services/milestone.services"));
const responses_constant_1 = require("../constants/responses.constant");
const milestoneController = {
    createMilestone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { milestoneName, startedDate, endDate, projectId } = req.body;
        try {
            const data = yield milestone_services_1.default.createMilestone({
                milestoneName,
                projectId,
                startedDate,
                endDate,
            });
            return res.json({
                message: 'Berhasil menambah data milestone',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getAllMilestones: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield milestone_services_1.default.getAllMilestones();
            return res.json({
                message: 'Berhasil mendapatkan semua data milestones',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMilestoneById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const data = yield milestone_services_1.default.getMilestoneById(Number(id));
            return res.json({
                message: 'Berhasil mendapatkan detail data milestone',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateMilestone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { milestoneName, startedDate, endDate, projectId } = req.body;
        try {
            const data = yield milestone_services_1.default.updateMilestone(Number(id), {
                milestoneName,
                startedDate,
                endDate,
                projectId,
            });
            return res.json({
                message: 'Berhasil mengubahl data milestone',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMilestone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const data = yield milestone_services_1.default.deleteMilestone(Number(id));
            return res.json({
                message: 'Berhasil menghapus data milestone',
                statusCode: responses_constant_1.HttpStatusCode.OK,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = milestoneController;
