"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const file_controller_1 = __importDefault(require("../controller/file.controller"));
const fileRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/download/:imageFolder/:imageName', auth_middleware_1.default, file_controller_1.default.downloadImage);
    router.get('/download/:imageFolder/:iconName', auth_middleware_1.default, file_controller_1.default.downloadIcon);
    return router;
};
exports.default = fileRouter;
