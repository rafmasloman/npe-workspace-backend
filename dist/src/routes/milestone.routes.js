"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const milestone_controller_1 = __importDefault(require("../controller/milestone.controller"));
const milestoneRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', auth_middleware_1.default, milestone_controller_1.default.getAllMilestones);
    router.post('/', auth_middleware_1.default, milestone_controller_1.default.createMilestone);
    router.get('/:id', auth_middleware_1.default, milestone_controller_1.default.getMilestoneById);
    router.put('/:id', auth_middleware_1.default, milestone_controller_1.default.updateMilestone);
    router.delete('/:id', auth_middleware_1.default, milestone_controller_1.default.deleteMilestone);
    return router;
};
exports.default = milestoneRouter;
