import { NextFunction, Request, Response } from 'express';
import MilestoneService from '../services/milestone.services';
import { HttpStatusCode } from '../constants/responses.constant';

const milestoneController = {
  createMilestone: async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const data = await MilestoneService.createMilestone(payload);

      return res.json({
        message: 'Berhasil menambah data milestone',
        statusCode: HttpStatusCode.CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllMilestones: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, status } = req.query;
      const data = await MilestoneService.getAllMilestones(
        name as string,
        status as any,
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data milestones',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  getMilestoneById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const data = await MilestoneService.getMilestoneById(Number(id));

      return res.json({
        message: 'Berhasil mendapatkan detail data milestone',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  getMilestoneByProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    try {
      const data = await MilestoneService.getMilestonesByProject(id);

      // const projectMilestone = data.map((milestone) => {
      //   console.log('project milestone : ', milestone);

      //   return milestone;
      // });

      // console.log('project milestone : ', projectMilestone);

      return res.json({
        message: 'Berhasil mendapatkan semua data milestones by project',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  getMilestonesByMember: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { memberId } = req.params;

    try {
      const data = await MilestoneService.getMilestonesByMember(memberId);

      return res.json({
        message: 'Berhasil mendapatkan semua data member milestones',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  updateMilestone: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const payload = req.body;

    try {
      const data = await MilestoneService.updateMilestone(Number(id), payload);

      return res.json({
        message: 'Berhasil mengubahl data milestone',
        statusCode: HttpStatusCode.CREATED,
        data,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },

  deleteMilestone: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const data = await MilestoneService.deleteMilestone(Number(id));

      return res.json({
        message: 'Berhasil menghapus data milestone',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default milestoneController;
