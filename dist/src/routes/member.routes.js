"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const member_controller_1 = __importDefault(require("../controller/member.controller"));
const multer_libs_1 = __importDefault(require("../libs/multer.libs"));
const memberRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, member_controller_1.default.getAllMember);
    router.get('/:id', auth_middleware_1.default, role_middleware_1.default, member_controller_1.default.getMemberDetail);
    router.post('/', auth_middleware_1.default, (0, multer_libs_1.default)('members').single('profilePicture'), member_controller_1.default.createMember);
    router.put('/:id', auth_middleware_1.default, role_middleware_1.default, member_controller_1.default.updateMember);
    router.delete('/:id', auth_middleware_1.default, role_middleware_1.default, member_controller_1.default.deleteMember);
    return router;
};
exports.default = memberRouter;
