import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateInvoiceRequestParams } from '../interfaces/invoice.interface';

class InvoiceServices {
  static async createInvoice(payload: ICreateInvoiceRequestParams) {
    try {
      const invoice = await prisma.invoices.create({
        data: {
          ...payload,
          clientId: payload.clientId,
        },
      });

      return invoice;
    } catch (error) {
      console.log('Client Create : ', error);

      throw error;
    }
  }

  static async updateInvoice(id: string, payload: ICreateInvoiceRequestParams) {
    try {
      const invoice = await prisma.invoices.update({
        where: {
          id,
        },
        data: {
          ...payload,
          clientId: payload.clientId,
        },
      });

      return invoice;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getAllInvoices(
    limit?: number,
    title?: string,
    clientName?: string,
  ) {
    try {
      const invoices = await prisma.invoices.findMany({
        include: {
          client: {
            include: {
              project: true,
            },
          },
        },
        where: {
          OR: [
            {
              invoicesTitle: {
                contains: title,
              },
            },
            {
              client: {
                name: {
                  contains: clientName,
                },
              },
            },
          ],
        },

        take: limit ? limit : undefined,
      });

      return invoices;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getInvoiceDetail(id: string) {
    try {
      const invoice = await prisma.invoices.findFirst({
        where: {
          id,
        },
        include: {
          client: {
            include: {
              project: true,
            },
          },
        },
      });

      if (!invoice) {
        throw new NotFoundError('Invalid Invoice Id');
      }

      return invoice;
    } catch (error) {
      throw error;
    }
  }

  static async deleteInvoice(id: string) {
    try {
      const findInvoice = await prisma.invoices.findFirst({
        where: {
          id,
        },
      });

      console.log('find client : ', findInvoice);

      if (!findInvoice) {
        throw new NotFoundError('Invalid Invoice id');
      }

      const invoice = await prisma.invoices.delete({
        where: {
          id,
        },
      });

      return invoice;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}

export default InvoiceServices;
