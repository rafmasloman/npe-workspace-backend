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
const admin_services_1 = __importDefault(require("../services/admin.services"));
const responses_constant_1 = require("../constants/responses.constant");
const adminController = {
    getAllRoles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roles = yield admin_services_1.default.getAllRoles();
        console.log(roles);
        return res.json({
            message: 'Berhasil mendapatkan semua role',
            statusCode: responses_constant_1.responseCodes.SUCCESS_FIND_ALL,
            data: roles,
        });
    }),
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield admin_services_1.default.getAllUser();
            return res.json({
                message: 'Berhasil mendapatkan semua data user',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: users,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getDetailUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield admin_services_1.default.getUserDetail(id);
            console.log(user);
            return res.json({
                message: 'Berhasil mendapatkan detail user',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password, fullname, role } = req.body;
        const user = yield admin_services_1.default.createUser(role, {
            email,
            username,
            password,
            fullname,
            roleId: role,
        });
        console.log(user);
        return res.json({
            message: 'Berhasil menambah user',
            statusCode: responses_constant_1.responseCodes.SUCCESS_CREATE,
            data: user,
        });
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield prisma_client_config_1.default.user.delete({
                where: {
                    id,
                },
            });
            if (user) {
                return res.json({
                    message: 'Berhasil menghapus user',
                    statusCode: 200,
                });
            }
            return res.json({
                message: 'Gagal menghapus user',
                statusCode: 400,
            });
        }
        catch (error) {
            return res.json({
                message: error,
                statusCode: 500,
            });
        }
    }),
};
exports.default = adminController;
