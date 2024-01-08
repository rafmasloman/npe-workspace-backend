"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const authRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/login', auth_controller_1.default.login);
    router.get('/credential', auth_middleware_1.default, auth_controller_1.default.credential);
    return router;
};
exports.default = authRouter;
