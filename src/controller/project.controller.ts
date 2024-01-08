import { NextFunction, Request, Response } from 'express';
import ProjectService from '../services/project.services';
import { HttpStatusCode } from '../constants/responses.constant';

const projectController = {
  createProject: async (req: any, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const image =
        (req.files?.image && req.files?.image[0]?.filename) || undefined;
      const projectIcon =
        (req.files?.projectIcon && req.files?.projectIcon[0]?.filename) ||
        undefined;

      const project = await ProjectService.createProject({
        ...payload,
        image,
        projectIcon,
      });

      return res.json({
        message: 'Berhasil membuat project',
        statusCode: HttpStatusCode.CREATED,
        data: project,
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  },

  getAllProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await ProjectService.getAllProject();

      return res.json({
        message: 'Berhasil mendapatkan semua data project',
        statusCode: HttpStatusCode.OK,
        data: projects,
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  },

  getProjectDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const project = await ProjectService.getProjetDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail project',
        statusCode: HttpStatusCode.OK,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  updateProject: async (req: any, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const image =
        (req.files?.image && req.files?.image[0]?.filename) || undefined;
      const projectIcon =
        (req.files?.projectIcon && req.files?.projectIcon[0]?.filename) ||
        undefined;

      console.log('image name : ', image);

      const project = await ProjectService.updateProject(id, {
        ...payload,
        price: Number(payload.price),
        image,
        projectIcon,
      });

      return res.json({
        message: 'Berhasil mengupdate project',
        statusCode: HttpStatusCode.CREATED,
        data: project,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },

  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const project = await ProjectService.deleteProject(id);

      return res.json({
        message: 'Berhasil menghapus project',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default projectController;
