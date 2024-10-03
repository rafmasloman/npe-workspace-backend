import { NextFunction, Request, Response } from 'express';
import ProjectService from '../services/project.services';
import { HttpStatusCode } from '../constants/responses.constant';
import TaskService from '../services/task/task.services';
import ProjectOnMember from '../services/project/projectOnMember';

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
      console.log('create project : ', error);

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
      next(error);
    }
  },

  getTeamMemberProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const memberProjects = await ProjectService.getProjectMember(id);

      return res.json({
        message: 'Berhasil mendapatkan anggota tim project',
        statusCode: HttpStatusCode.OK,
        data: memberProjects,
      });
    } catch (error) {
      return res.json({
        message: error,
      });
    }
  },

  getMemberPayrollByProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const memberProjects = await ProjectService.getProjectMemberPayroll(id);

      return res.json({
        message: 'Berhasil mendapatkan data payroll anggota tim',
        statusCode: HttpStatusCode.OK,
        data: memberProjects,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const projectName = req.query.projectName;

      const userProject = await ProjectService.getMemberProject(
        id,
        projectName as string,
      );

      return res.json({
        message: 'Berhasil mendapatkan user project',
        statusCode: HttpStatusCode.OK,
        data: userProject,
      });
    } catch (error) {
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
        image,
        projectIcon,
      });

      return res.json({
        message: 'Berhasil mengupdate project',
        statusCode: HttpStatusCode.CREATED,
        data: project,
      });
    } catch (error) {
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
    try {
      const id = req.params.id;
      const memberId = req.params.memberId;
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
