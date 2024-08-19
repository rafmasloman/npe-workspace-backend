import { NextFunction, Request, Response } from 'express';
import { createReadStream, readFile } from 'fs';
import path from 'path';

const fileController = {
  downloadImage: (req: Request, res: Response, next: NextFunction) => {
    try {
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.bmp': 'image/bmp',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
      };

      const imageName = req.params.imageName;
      const imageFolder = req.params.imageFolder;

      console.log('image name', imageName);

      const imagePath = path.join(
        __dirname,
        `../../public/uploads/${imageFolder}`,
        imageName,
      );

      readFile(imagePath, (err, data) => {
        if (err) {
          res.status(404).send('File not found!');
        } else {
          res.setHeader('Content-Type', ['image/jpeg', 'image/png']);
          res.send(data);
        }
      });

      // res.sendFile(imagePath);
    } catch (error) {
      console.log('error : ', error);
      next(error);
    }
  },

  downloadIcon: (req: Request, res: Response, next: NextFunction) => {
    try {
      const iconName = req.params.iconName;
      const imageFolder = req.params.imageFolder;

      console.log(`iconName : ${iconName}, imageFolder : ${imageFolder}`);

      const iconPath = path.join(
        __dirname,
        `../../public/uploads/${imageFolder}`,
        iconName,
      );

      res.sendFile(iconPath);
    } catch (error) {
      console.log('error : ', error);
      next(error);
    }
  },
};

export default fileController;
