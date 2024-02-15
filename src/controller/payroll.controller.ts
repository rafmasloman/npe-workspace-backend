import { NextFunction, Request, Response } from 'express';
import PayrollService from '../services/payroll.services';
import { HttpStatusCode } from '../constants/responses.constant';

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
      const data = await PayrollService.getAllPayroll();

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
}

export default PayrollController;
