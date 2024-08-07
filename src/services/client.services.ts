import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateClientRequestParams } from '../interfaces/client.interfaces';

class ClientService {
  static async createClient(payload: ICreateClientRequestParams) {
    try {
      console.log('client : ', payload.project === undefined);

      const client = await prisma.client.create({
        data: {
          address: payload.address,
          email: payload.email,
          name: payload.name,
          phoneNumber: payload.phoneNumber,

          // project: {
          //   connect: {
          //     id: !payload.project ? null : payload.project,
          //   },
          // },
          projectId: !payload.project ? null : payload.project,
        },
      });

      return client;
    } catch (error) {
      console.log('Client Create : ', error);

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
          address: payload.address,
          email: payload.email,
          name: payload.name,
          phoneNumber: payload.phoneNumber,
          projectId: !payload.project ? null : payload.project,
        },
      });

      return client;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getAllClient(
    name?: string,
    projectName?: string,
    limit?: number,
  ) {
    try {
      const clients = await prisma.client.findMany({
        include: {
          project: {
            select: {
              projectName: true,
              projectIcon: true,
              price: true,
            },
          },
        },
        where: {
          OR: [
            {
              name: {
                contains: !name ? '' : name,
              },
            },
            {
              project: {
                projectName: {
                  contains: !projectName ? '' : projectName,
                },
              },
            },
          ],
        },
        take: !limit ? undefined : limit,
      });

      console.log('clients : ', clients);

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
        include: {
          project: {
            select: {
              id: true,
              projectName: true,
            },
          },
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
      const findClient = await prisma.client.findFirst({
        where: {
          id,
        },
      });

      console.log('find client : ', findClient);

      if (!findClient) {
        throw new NotFoundError('Invalid id Client');
      }

      const client = await prisma.client.delete({
        where: {
          id,
        },
      });

      return client;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}

export default ClientService;
