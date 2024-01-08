import { NextFunction, Request, Response } from 'express';
import PayrollService from '../services/payroll.services';

class PayrollController {
  static async createPayroll(req: Request, res: Response, next: NextFunction) {
    let { percent, paymentMethod, date, memberId, projectId } = req.body;
    try {
      const data = await PayrollService.createPayroll({
        percent,
        projectId,
        memberId,
        date,
        paymentMethod,
      });

      return data;
    } catch (error) {
      console.log('payroll create : ', error);
      throw error;
    }
  }
}

export default PayrollController;
