import { NextFunction, Request, Response } from 'express';
import MemberService from '../services/member.services';
import { HttpStatusCode } from '../constants/responses.constant';
import { ICreateMemberRequestParams } from '../interfaces/member.interface';

const memberController = {
  createMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const profilePicture = req.file?.filename;

      const initialBirthDate = new Date(payload.birthDate);

      const member = await MemberService.createMember({
        ...payload,
        birthDate: initialBirthDate,
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
      const payload = req.body;
      const id = req.params.id;
      const profilePicture = req.file?.filename;

      console.log(profilePicture);

      const member = await MemberService.updateMember(
        id,
        payload as ICreateMemberRequestParams,
      );
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
      const { firstname, lastname, position, limit } = req.query;
      const members = await MemberService.getAllMember(
        firstname as string,
        lastname as string,
        position as string,
        Number(limit) || undefined,
      );

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
      console.log(id);

      const member = await MemberService.getMemberDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail members',
        statusCode: HttpStatusCode.OK,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  getMembersProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const memberProject = await MemberService.getMemberProject(id);

      return res.json({
        message: 'Berhasil mendapatkan project member',
        statusCode: HttpStatusCode.OK,
        data: memberProject,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
};

export default memberController;
