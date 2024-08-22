import { NextFunction, Request, Response } from 'express';
import prisma from '../config/prisma-client.config';
import AdminService from '../services/admin.services';
import { HttpStatusCode, responseCodes } from '../constants/responses.constant';
import NotFoundError from '../error/not-found.error';
import { IUserDetailResponse } from '../interfaces/user.interface';
import { userValidationSchema } from '../utils/schema.utils';
import ValidationError from '../error/validation.error';

const adminController = {
  getAllRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await AdminService.getAllRoles();

      return res.json({
        message: 'Berhasil mendapatkan semua role',
        statusCode: HttpStatusCode.OK,
        data: roles,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await AdminService.getAllUser();
      return res.json({
        message: 'Berhasil mendapatkan semua data user',
        statusCode: HttpStatusCode.OK,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserStaff: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staff = await AdminService.getUserStaff();

      return res.json({
        message: 'Berhasil mendapatkan user staf',
        statusCode: HttpStatusCode.OK,
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await AdminService.getUserMember();

      return res.json({
        message: 'Berhasil mendapatkan user member',
        statusCode: HttpStatusCode.OK,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserNonMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await AdminService.getUserNonMember();

      return res.json({
        message: 'Berhasil mendapatkan user yang belum menjadi member',
        statusCode: HttpStatusCode.OK,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  getProjectManagerWithNonProject: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const member = await AdminService.getProjectManagerWithNonProject();

      return res.json({
        message: 'Berhasil mendapatkan project manager',
        statusCode: HttpStatusCode.OK,
        data: member,
      });
    } catch (error) {
      next(error);
    }
  },

  getDetailUser: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const user: IUserDetailResponse = await AdminService.getUserDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail user',
        statusCode: HttpStatusCode.OK,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  changeUserPassword: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId, newPassword } = req.body;
      const id = req.params.id;

      const user = await AdminService.changePassword(id, {
        userId,
        newPassword,
      });

      return res.json({
        message: 'Berhasil Mengubah Password',
        statusCode: HttpStatusCode.CREATED,
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password, firstname, lastname, role } = req.body;
      const { error, value } = userValidationSchema.validate({
        email,
        username,
        password,
        firstname,
        lastname,
        role,
      });

      if (error) {
        throw new ValidationError(error.message);
      }

      const user = await AdminService.createUser(value);

      return res.json({
        message: 'Berhasil menambah user',
        statusCode: HttpStatusCode.CREATED,
        data: user,
      });
    } catch (error) {
      console.error(error);

      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const { email, username, firstname, lastname, role } = req.body;

      const user = await AdminService.updateUser(userId, {
        email,
        username,
        firstname,
        lastname,
        role,
      });

      return res.json({
        message: 'Berhasil mengupdate user',
        statusCode: HttpStatusCode.CREATED,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      if (user) {
        return res.json({
          message: 'Berhasil menghapus user',
          statusCode: 200,
        });
      }

      return res.json({
        message: 'Gagal menghapus user',
        statusCode: 400,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default adminController;
