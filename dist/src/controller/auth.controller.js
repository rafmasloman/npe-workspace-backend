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
const auth_services_1 = __importDefault(require("../services/auth.services"));
const responses_constant_1 = require("../constants/responses.constant");
const admin_services_1 = __importDefault(require("../services/admin.services"));
const authController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield auth_services_1.default.login({ email, password });
            return res.json({
                statusCode: responses_constant_1.HttpStatusCode.OK,
                message: 'Berhasil Login',
                data: {
                    token: user,
                },
            });
        }
        catch (error) {
            console.log('error : ', error);
            next(error);
        }
    }),
    credential: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userCredential = req.body.user;
            console.log('user : ', req.body.user);
            const user = yield admin_services_1.default.getUserDetail(userCredential.userId);
            return res.json({
                statusCode: responses_constant_1.HttpStatusCode.OK,
                message: 'Berhasil menampilkan user credential',
                user,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }),
};
exports.default = authController;
