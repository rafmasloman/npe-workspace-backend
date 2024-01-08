import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import PayrollController from '../controller/payroll.controller';

class PayrollRoute {
  static route = Router();

  static routes(): Router {
    this.route.post('/', authToken, PayrollController.createPayroll);

    return this.route;
  }
}

export default PayrollRoute;
