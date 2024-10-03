// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const multerConfig = (filename?: string) => {
//   try {
//     const currentDirectory = path.join(__dirname, `..`, '..');

//     const storage = multer.diskStorage({
//       destination: (req, file, callback) => {
//         callback(null, `public/uploads/${filename}`);
//       },
//       filename: (req, file, callback) => {
//         callback(null, file.originalname);
//       },
//     });

//     const uploads = multer({ storage });
//     return uploads;
//   } catch (error) {
//     throw error;
//   }
// };

// export default multerConfig;

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Pastikan folder uploads ada, jika tidak buat foldernya
const ensureUploadsExist = (uploadsPath: string) => {
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true }); // Membuat folder secara rekursif
  }
};

const multerConfig = (filename?: string) => {
  try {
    // Gunakan path absolute ke folder public/uploads
    const uploadsPath = path.join(
      __dirname,
      `..`,
      `..`,
      `public`,
      `uploads`,
      filename || '',
    );
    ensureUploadsExist(uploadsPath); // Pastikan folder uploads ada

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, uploadsPath); // Ganti ke path uploads
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
