import { NextFunction, Request, Response } from 'express';
import ProjectService from '../services/project.services';
import { HttpStatusCode } from '../constants/responses.constant';
import TaskService from '../services/task.services';

const projectController = {
  createProject: async (req: any, res: Response, next: NextFunction) => {
    try {
      const { projectName, description, price, platform, member } = req.body;

      console.log('project : ', req.body);

      const image =
        (req.files?.image && req.files?.image[0]?.filename) || undefined;
      const projectIcon =
        (req.files?.projectIcon && req.files?.projectIcon[0]?.filename) ||
        undefined;

      const project = await ProjectService.createProject({
        projectName,
        description,
        price,
        platform,
        member,
        image,
        projectIcon,
      });

      console.log('tess');

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
      const limit = req.query.limit;
      const projectName = req.query.projectName;

      const projects = await ProjectService.getAllProject(
        Number(limit),
        projectName as string,
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data project',
        statusCode: HttpStatusCode.OK,
        data: projects,
      });
    } catch (error) {
      console.log('error : ', error);

      return res.json({
        message: error,
      });
    }
  },

  getMemberProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const memberProjects = await ProjectService.getProjectByMember(id);

      return res.json({
        message: 'Berhasil mendapatkan semua data user projects',
        statusCode: HttpStatusCode.OK,
        data: memberProjects,
      });
    } catch (error) {
      console.log('error : ', error);

      return res.json({
        message: error,
      });
    }
  },

  getProjectDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const project = await ProjectService.getProjetDetail(id);
      const onToDoTask = await TaskService.getTasksByProjectStatus(id, 'TODO');
      const onProgressTask = await TaskService.getTasksByProjectStatus(
        id,
        'ON_PROGRESS',
      );
      const onCompletedTask = await TaskService.getTasksByProjectStatus(
        id,
        'COMPLETED',
      );

      return res.json({
        message: 'Berhasil mendapatkan detail project',
        statusCode: HttpStatusCode.OK,
        data: {
          project,
          todos: {
            todo: onToDoTask,
            onprogress: onProgressTask,
            completed: onCompletedTask,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateProject: async (req: any, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const {
        projectName,
        description,
        price,
        platform,
        member,
        startedDate,
        endDate,
      } = req.body;

      const image =
        (req.files?.image && req.files?.image[0]?.filename) || undefined;
      const projectIcon =
        (req.files?.projectIcon && req.files?.projectIcon[0]?.filename) ||
        undefined;

      console.log('image name : ', image);

      const project = await ProjectService.updateProject(id, {
        projectName,
        description,
        price,
        platform,
        member,
        image,
        startedDate: new Date(startedDate),
        endDate: new Date(endDate),
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
