import { NextFunction, Request, Response } from 'express';
import prisma from '../config/prisma-client.config';
import AdminService from '../services/admin.services';
import { HttpStatusCode, responseCodes } from '../constants/responses.constant';
import NotFoundError from '../error/not-found.error';
import { IUserDetailResponse } from '../interfaces/user.interface';

const adminController = {
  getAllRoles: async (req: Request, res: Response) => {
    const roles = await AdminService.getAllRoles();

    console.log(roles);
    return res.json({
      message: 'Berhasil mendapatkan semua role',
      statusCode: responseCodes.SUCCESS_FIND_ALL,
      data: roles,
    });
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

  getDetailUser: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const user: IUserDetailResponse = await AdminService.getUserDetail(id);

      console.log(user);

      return res.json({
        message: 'Berhasil mendapatkan detail user',
        statusCode: HttpStatusCode.OK,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { email, username, password, fullname, role } = req.body;
    const user = await AdminService.createUser(role, {
      email,
      username,
      password,
      fullname,
      roleId: role,
    });

    console.log(user);
    return res.json({
      message: 'Berhasil menambah user',
      statusCode: responseCodes.SUCCESS_CREATE,
      data: user,
    });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

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
      return res.json({
        message: error,
        statusCode: 500,
      });
    }
  },
};

export default adminController;
