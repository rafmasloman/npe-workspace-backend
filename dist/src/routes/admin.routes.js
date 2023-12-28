"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const adminRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, role_middleware_1.default, admin_controller_1.default.getAllUsers);
    router.post('/', admin_controller_1.default.createUser);
    router.get('/roles', admin_controller_1.default.getAllRoles);
    router.get('/:id', admin_controller_1.default.getDetailUser);
    return router;
};
exports.default = adminRouter;
