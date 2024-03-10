import { NextFunction, Request, Response } from 'express';
import ProjectService from '../services/project.services';
import { HttpStatusCode } from '../constants/responses.constant';
import TaskService from '../services/task/task.services';
import ProjectOnMember from '../services/project/projectOnMember';

const projectController = {
  createProject: async (req: any, res: Response, next: NextFunction) => {
    console.log('project : ', req.body.startedDate);
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

  getUserProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const projectName = req.query.projectName;

      const userProject = await ProjectService.getUserProject(
        id,
        projectName as string,
      );

      return res.json({
        message: 'Berhasil mendapatkan user project',
        statusCode: HttpStatusCode.OK,
        data: userProject,
      });
    } catch (error) {
      console.log(error);

      next(error);
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

  inviteMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, member } = req.body;

      const project = await ProjectOnMember.inviteMemberToProject({
        projectId,
        member,
      });

      return res.json({
        message: 'Berhasil mengundang member ke dalam project',
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

      const project = await ProjectService.updateProject(id, {
        ...payload,
        member: payload.member,
        image,
        projectIcon,
      });

      console.log('data : ', project);

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

  deleteMemberFromProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log('req body : ', req.params.memberId);
    console.log('req body : ', req.params.id);

    try {
      const id = req.params.id;
      const memberId = req.params.memberId;
      // const { memberId } = req.body;
      const project = await ProjectOnMember.deleteMemberFromProject(
        id,
        memberId,
      );

      return res.json({
        message: 'Berhasil member dari project',
        statusCode: HttpStatusCode.OK,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default projectController;
