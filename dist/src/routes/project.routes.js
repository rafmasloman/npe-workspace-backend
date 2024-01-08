"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const project_controller_1 = __importDefault(require("../controller/project.controller"));
const multer_libs_1 = __importDefault(require("../libs/multer.libs"));
const projectRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, role_middleware_1.default, project_controller_1.default.getAllProject);
    router.get('/:id', auth_middleware_1.default, role_middleware_1.default, project_controller_1.default.getProjectDetail);
    router.post('/', auth_middleware_1.default, 
    // checkRole,
    (0, multer_libs_1.default)('projects').fields([
        {
            name: 'image',
            maxCount: 4,
        },
        {
            name: 'projectIcon',
            maxCount: 1,
        },
    ]), project_controller_1.default.createProject);
    router.put('/:id', auth_middleware_1.default, role_middleware_1.default, (0, multer_libs_1.default)('projects').fields([
        {
            name: 'image',
            maxCount: 4,
        },
        {
            name: 'projectIcon',
            maxCount: 1,
        },
    ]), project_controller_1.default.updateProject);
    router.delete('/:id', auth_middleware_1.default, role_middleware_1.default, project_controller_1.default.deleteProject);
    return router;
};
exports.default = projectRouter;
