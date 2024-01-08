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
const project_services_1 = __importDefault(require("./project.services"));
class PayrollService {
    static createPayroll(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield project_services_1.default.getProjetDetail(payload.projectId);
                console.log('project on payroll : ', project.price);
                const payroll = yield prisma_client_config_1.default.payroll.create({
                    data: Object.assign(Object.assign({}, payload), { memberId: payload.memberId, projectId: payload.projectId }),
                });
                return payroll;
            }
            catch (error) {
                console.log('payroll creata : ', error);
                throw error;
            }
        });
    }
    static getMemberPayroll(payrollId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield prisma_client_config_1.default.payroll.findFirst({
                    where: {
                        id: payrollId,
                    },
                });
                return payroll;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updatePayroll(payload, payrollId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield prisma_client_config_1.default.payroll.update({
                    where: {
                        id: payrollId,
                    },
                    data: Object.assign({}, payload),
                });
                return payroll;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deletePayroll(payrollId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield prisma_client_config_1.default.payroll.delete({
                    where: {
                        id: payrollId,
                    },
                });
                return payroll;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PayrollService;
