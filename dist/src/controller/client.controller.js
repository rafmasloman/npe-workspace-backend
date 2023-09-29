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
const client_services_1 = __importDefault(require("../services/client.services"));
const responses_constant_1 = require("../constants/responses.constant");
const clientController = {
    createClient: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const client = yield client_services_1.default.createClient(payload);
            return res.json({
                message: 'Berhasil menambah data client',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: client,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateClient: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const payload = req.body;
            const client = yield client_services_1.default.updateClient(id, payload);
            return res.json({
                message: 'Berhasil mengubah data client',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: client,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteClient: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const client = yield client_services_1.default.deleteClient(id);
            console.log(client);
            return res.json({
                message: 'Berhasil menghapus data client',
                statusCode: responses_constant_1.HttpStatusCode.OK,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getAllClient: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clients = yield client_services_1.default.getAllClient();
            return res.json({
                message: 'Berhasil mendapatkan semua data project',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: clients,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getClientDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const client = yield client_services_1.default.getClientDetail(id);
            return res.json({
                message: 'Berhasil mendapatkan detail client',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: client,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = clientController;
