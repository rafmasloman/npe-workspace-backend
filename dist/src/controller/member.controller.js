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
const member_services_1 = __importDefault(require("../services/member.services"));
const responses_constant_1 = require("../constants/responses.constant");
const memberController = {
    createMember: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { position, phoneNumber, gender, birthDate } = req.body;
            const profilePicture = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            console.log('member : ', { position, phoneNumber, gender, birthDate });
            const initialBirthDate = new Date(birthDate);
            const member = yield member_services_1.default.createMember({
                position,
                phoneNumber,
                gender,
                birthDate: initialBirthDate,
                profilePicture,
            });
            return res.json({
                message: 'Berhasil menambah data member',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: member,
            });
        }
        catch (error) {
            console.log('error controller : ', error);
            next(error);
        }
    }),
    updateMember: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const payload = req.body;
            const member = yield member_services_1.default.updateMember(id, payload);
            return res.json({
                message: 'Berhasil mengubah data member',
                statusCode: responses_constant_1.HttpStatusCode.CREATED,
                data: member,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMember: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const member = yield member_services_1.default.deleteMember(id);
            console.log(member);
            return res.json({
                message: 'Berhasil menghapus data member',
                statusCode: responses_constant_1.HttpStatusCode.OK,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getAllMember: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const members = yield member_services_1.default.getAllMember();
            return res.json({
                message: 'Berhasil mendapatkan semua data member',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: members,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMemberDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const member = yield member_services_1.default.getMemberDetail(id);
            return res.json({
                message: 'Berhasil mendapatkan detail member',
                statusCode: responses_constant_1.HttpStatusCode.OK,
                data: member,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = memberController;
