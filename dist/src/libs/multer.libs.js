"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multerConfig = (filename) => {
    try {
        const currentDirectory = path_1.default.join(__dirname, `..`, '..');
        console.log('fs : ', fs_1.default.existsSync);
        const storage = multer_1.default.diskStorage({
            destination: (req, file, callback) => {
                callback(null, `public/uploads/${filename}`);
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        });
        const uploads = (0, multer_1.default)({ storage });
        return uploads;
    }
    catch (error) {
        console.log('error : ', error);
        throw error;
    }
};
exports.default = multerConfig;
