import { NextFunction, Request, Response } from 'express';
import InvoiceServices from '../services/invoice.services';
import { HttpStatusCode } from '../constants/responses.constant';
import ejs from 'ejs';

class InvoiceController {
  static async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const invoice = await InvoiceServices.createInvoice(payload);

      return res.json({
        message: 'Berhasil mengambil semua data invoices',
        statusCode: HttpStatusCode.CREATED,
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const { id } = req.params;

      const invoice = await InvoiceServices.updateInvoice(id, payload);

      return res.json({
        message: 'Berhasil menambah data tagihan client',
        statusCode: HttpStatusCode.CREATED,
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, clientName, title } = req.query;
      const invoices = await InvoiceServices.getAllInvoices(
        Number(limit),
        title as string,
        clientName as string,
      );

      return res.json({
        message: 'Berhasil menambah data tagihan client',
        statusCode: HttpStatusCode.OK,
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInvoiceDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const invoices = await InvoiceServices.getInvoiceDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail invoice',
        statusCode: HttpStatusCode.OK,
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const invoice = await InvoiceServices.deleteInvoice(id);

      return res.json({
        message: 'Berhasil menghapus invoice',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async sendInvoiceEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.body;

      const invoiceEmail = await InvoiceServices.sendEmail(payload);

      return res.json({
        message: 'Berhasil mengirim invoice kepada client',
        statusCode: HttpStatusCode.OK,
        invoiceEmail,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async renderEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const renderEmail = await ejs.renderFile('src/views/invoice-email.ejs', {
        clientName: 'Reski Anugerah',
      });

      console.log('render email : ', renderEmail);

      return res.send(renderEmail);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

export default InvoiceController;
