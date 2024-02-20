import { NextFunction, Request, Response } from 'express';
import PayrollService from '../services/payroll.services';
import { HttpStatusCode } from '../constants/responses.constant';
import MemberOnPayroll from '../services/memberOnPayroll.services';

class PayrollController {
  static async createPayroll(req: Request, res: Response, next: NextFunction) {
    let payload = req.body;
    try {
      const data = await PayrollService.createPayroll(payload);
      return res.json({
        message: 'Berhasil menambah data payroll',
        statusCode: HttpStatusCode.CREATED,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllPayroll(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberName, position, status, limit } = req.query;
      const data = await PayrollService.getAllPayroll(
        memberName as string,
        status as any,
        position as string,
        Number(limit),
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data payroll',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deletePayroll(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await PayrollService.deletePayroll(Number(id));

      return res.json({
        message: 'Berhasil menghapus payroll',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getMembersPayroll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await MemberOnPayroll.getMembersPayroll();

      return res.json({
        message: 'Berhasil mendapatkan data payroll tim member',
        statusCode: HttpStatusCode.OK,
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PayrollController;
