"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fileController = {
    downloadImage: (req, res, next) => {
        try {
            const imageName = req.params.imageName;
            const imageFolder = req.params.imageFolder;
            console.log(`imageName : ${imageName}, imageFolder : ${imageFolder}`);
            const imagePath = path_1.default.join(__dirname, `../../public/uploads/${imageFolder}`, imageName);
            console.log('image path : ', imagePath);
            res.sendFile(imagePath);
        }
        catch (error) {
            console.log('error : ', error);
            next(error);
        }
    },
    downloadIcon: (req, res, next) => {
        try {
            const iconName = req.params.iconName;
            const imageFolder = req.params.imageFolder;
            console.log(`iconName : ${iconName}, imageFolder : ${imageFolder}`);
            const iconPath = path_1.default.join(__dirname, `../../public/uploads/${imageFolder}`, iconName);
            console.log('image path : ', iconPath);
            res.sendFile(iconPath);
        }
        catch (error) {
            console.log('error : ', error);
            next(error);
        }
    },
};
exports.default = fileController;
