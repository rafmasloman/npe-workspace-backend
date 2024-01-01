import { NextFunction, Request, Response } from 'express';
import MilestoneService from '../services/milestone.services';
import { HttpStatusCode } from '../constants/responses.constant';

const milestoneController = {
  createMilestone: async (req: Request, res: Response, next: NextFunction) => {
    const { milestoneName, startedDate, endDate, projectId } = req.body;

    try {
      const data = await MilestoneService.createMilestone({
        milestoneName,
        projectId,
        startedDate,
        endDate,
      });

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
      const data = await MilestoneService.getAllMilestones();

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

  updateMilestone: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { milestoneName, startedDate, endDate, projectId } = req.body;

    try {
      const data = await MilestoneService.updateMilestone(Number(id), {
        milestoneName,
        startedDate,
        endDate,
        projectId,
      });

      return res.json({
        message: 'Berhasil mengubahl data milestone',
        statusCode: HttpStatusCode.CREATED,
        data,
      });
    } catch (error) {
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
