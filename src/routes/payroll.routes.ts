import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import PayrollController from '../controller/payroll.controller';

class PayrollRoute {
  static route = Router();

  static routes(): Router {
    this.route.post('/', authToken, PayrollController.createPayroll);
    this.route.get('/', authToken, PayrollController.getAllPayroll);
    this.route.get(
      '/:id/members',
      authToken,
      PayrollController.getMembersPayroll,
    );
    this.route.get('/:id', authToken, PayrollController.getPayrollDetail);
    this.route.get(
      '/:id/member',
      authToken,
      PayrollController.getMemberPayroll,
    );
    this.route.put('/:id', authToken, PayrollController.updatePayroll);
    this.route.delete('/:id', authToken, PayrollController.deletePayroll);

    return this.route;
  }
}

export default PayrollRoute;
