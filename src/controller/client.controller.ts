import { NextFunction, Request, Response } from 'express';
import ClientService from '../services/client.services';
import { HttpStatusCode } from '../constants/responses.constant';

const clientController = {
  createClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const client = await ClientService.createClient(payload);

      return res.json({
        message: 'Berhasil menambah data client',
        statusCode: HttpStatusCode.CREATED,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  },

  updateClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const client = await ClientService.updateClient(id, payload);
      return res.json({
        message: 'Berhasil mengubah data client',
        statusCode: HttpStatusCode.CREATED,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const client = await ClientService.deleteClient(id);
      console.log(client);

      return res.json({
        message: 'Berhasil menghapus data client',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await ClientService.getAllClient();

      return res.json({
        message: 'Berhasil mendapatkan semua data project',
        statusCode: HttpStatusCode.OK,
        data: clients,
      });
    } catch (error) {
      next(error);
    }
  },

  getClientDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const client = await ClientService.getClientDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail client',
        statusCode: HttpStatusCode.OK,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default clientController;
