import { NextFunction, Request, Response } from 'express';
import MemberService from '../services/member.services';
import { HttpStatusCode } from '../constants/responses.constant';
import { ICreateMemberRequestParams } from '../interfaces/member.interface';

const memberController = {
  createMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { position, phoneNumber, gender, birthDate } = req.body;
      const profilePicture = req.file?.filename;

      console.log('member : ', { position, phoneNumber, gender, birthDate });
      const initialBirthDate = new Date(birthDate);

      const member = await MemberService.createMember({
        position,
        phoneNumber,
        gender,
        birthDate: initialBirthDate,
        profilePicture,
      } as ICreateMemberRequestParams);

      return res.json({
        message: 'Berhasil menambah data member',
        statusCode: HttpStatusCode.CREATED,
        data: member,
      });
    } catch (error) {
      console.log('error controller : ', error);

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
