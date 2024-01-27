import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import InvoiceController from '../controller/invoices.controller';

class InvoiceRouter {
  static route = Router();

  static routes(): Router {
    this.route.post('/', authToken, InvoiceController.createInvoice);
    this.route.get('/', authToken, InvoiceController.getAllInvoices);
    this.route.get('/:id', authToken, InvoiceController.getInvoiceDetail);
    this.route.delete('/:id', authToken, InvoiceController.deleteInvoice);
    this.route.put('/:id', authToken, InvoiceController.updateInvoice);
    this.route.post(
      '/sendEmail',
      authToken,
      InvoiceController.sendInvoiceEmail,
    );

    return this.route;
  }
}

export default InvoiceRouter;
