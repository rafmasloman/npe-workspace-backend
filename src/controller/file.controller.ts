import { NextFunction, Request, Response } from 'express';
import path from 'path';

const fileController = {
  downloadImage: (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.params.imageName;
      const imageFolder = req.params.imageFolder;

      console.log(`imageName : ${imageName}, imageFolder : ${imageFolder}`);

      const imagePath = path.join(
        __dirname,
        `../../public/uploads/${imageFolder}`,
        imageName,
      );

      console.log('image path : ', imagePath);

      res.sendFile(imagePath);
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

      console.log('image path : ', iconPath);

      res.sendFile(iconPath);
    } catch (error) {
      console.log('error : ', error);
      next(error);
    }
  },
};

export default fileController;
