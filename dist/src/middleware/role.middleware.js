"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthrized_error_1 = __importDefault(require("../error/unauthrized.error"));
const checkRole = (req, res, next) => {
    try {
        const { role } = req.body.user;
        console.log('role : ', req.body.user);
        if (role.toLowerCase() !== 'admin'.toLowerCase()) {
            throw new unauthrized_error_1.default('Hanya Admin yang bisa mengakses endpoint ini');
        }
        next();
    }
    catch (error) {
        console.log('error : ', error);
        next(error);
    }
};
exports.default = checkRole;
