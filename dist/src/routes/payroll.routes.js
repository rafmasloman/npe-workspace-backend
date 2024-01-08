"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const payroll_controller_1 = __importDefault(require("../controller/payroll.controller"));
class PayrollRoute {
    static routes() {
        this.route.post('/', auth_middleware_1.default, payroll_controller_1.default.createPayroll);
        return this.route;
    }
}
PayrollRoute.route = (0, express_1.Router)();
exports.default = PayrollRoute;
