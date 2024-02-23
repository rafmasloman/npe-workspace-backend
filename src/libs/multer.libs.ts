import multer from 'multer';
import path from 'path';
import fs from 'fs';

const multerConfig = (filename?: string) => {
  try {
    const currentDirectory = path.join(__dirname, `..`, '..');

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, `public/uploads/${filename}`);
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    });

    const uploads = multer({ storage });
    return uploads;
  } catch (error) {
    throw error;
  }
};

export default multerConfig;
