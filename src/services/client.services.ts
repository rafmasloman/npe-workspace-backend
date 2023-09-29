import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateClientRequestParams } from '../interfaces/client.interfaces';

class ClientService {
  static async createClient(payload: ICreateClientRequestParams) {
    try {
      const client = await prisma.client.create({
        data: {
          ...payload,
        },
      });

      return client;
    } catch (error) {
      throw error;
    }
  }

  static async updateClient(id: string, payload: ICreateClientRequestParams) {
    try {
      const client = await prisma.client.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return client;
    } catch (error) {
      throw error;
    }
  }

  static async getAllClient() {
    try {
      const clients = await prisma.client.findMany();

      return clients;
    } catch (error) {
      throw error;
    }
  }

  static async getClientDetail(id: string) {
    try {
      const client = await prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (!client) {
        throw new NotFoundError('Invalid id Client');
      }

      return client;
    } catch (error) {
      throw error;
    }
  }

  static async deleteClient(id: string) {
    try {
      const findClient = await prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (findClient) {
        throw new NotFoundError('Invalid id Client');
      }

      const client = await prisma.client.delete({
        where: {
          id,
        },
      });

      return client;
    } catch (error) {
      return error;
    }
  }
}

export default ClientService;
