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
const schema_utils_1 = require("../utils/schema.utils");
const validation_error_1 = __importDefault(require("../error/validation.error"));
const adminController = {
    getAllRoles: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roles = yield admin_services_1.default.getAllRoles();
            console.log(roles);
            return res.json({
                message: 'Berhasil mendapatkan semua role',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: roles,
            });
        }
        catch (error) {
            next(error);
        }
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
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, password, fullname, role } = req.body;
            const { error, value } = schema_utils_1.userValidationSchema.validate({
                email,
                username,
                password,
                fullname,
                role,
            });
            if (error) {
                throw new validation_error_1.default(error.message);
            }
            const user = yield admin_services_1.default.createUser(value);
            return res.json({
                message: 'Berhasil menambah user',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const payload = req.body;
            const user = yield admin_services_1.default.updateUser(userId, payload);
            return res.json({
                message: 'Berhasil mengupdate user',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: {
                    user,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
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
            next(error);
        }
    }),
};
exports.default = adminController;
