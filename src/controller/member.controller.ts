import { NextFunction, Request, Response } from 'express';
import MemberService from '../services/member.services';
import { HttpStatusCode } from '../constants/responses.constant';

const memberController = {
  createMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const member = await MemberService.createMember(payload);

      return res.json({
        message: 'Berhasil menambah data member',
        statusCode: HttpStatusCode.CREATED,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  updateMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const member = await MemberService.updateMember(id, payload);
      return res.json({
        message: 'Berhasil mengubah data member',
        statusCode: HttpStatusCode.CREATED,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const member = await MemberService.deleteMember(id);
      console.log(member);

      return res.json({
        message: 'Berhasil menghapus data member',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await MemberService.getAllMember();

      return res.json({
        message: 'Berhasil mendapatkan semua data member',
        statusCode: HttpStatusCode.OK,
        data: members,
      });
    } catch (error) {
      next(error);
    }
  },

  getMemberDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const member = await MemberService.getMemberDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail member',
        statusCode: HttpStatusCode.OK,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default memberController;
