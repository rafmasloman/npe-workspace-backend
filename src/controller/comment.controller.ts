import { NextFunction, Request, Response } from 'express';
import CommentService from '../services/comment.services';
import { HttpStatusCode } from '../constants/responses.constant';
import { Socket } from 'socket.io';
import { ICreateCommentRequestParams } from '../interfaces/comment.interfaces';

const commentController = {
  createComment: async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const comment = await CommentService.createComments(payload);

      return res.json({
        message: 'Berhasil menambah komentar',
        statusCode: HttpStatusCode.CREATED,
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  },

  sendCommentMessage: async (socket: Socket) => {
    socket.on('message', async (data: any) => {
      console.log('message : ', data);

      try {
        const comment = CommentService.createComments(data);

        console.log(data);

        socket.broadcast.emit('message', data);
      } catch (error) {
        throw error;
      }
    });
  },

  getAllComments: async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.body;
    try {
      const comments = await CommentService.getAllComments({ taskId });

      return res.json({
        message: 'Berhasil mendapatkan semua data komentar',
        statusCode: HttpStatusCode.CREATED,
        data: comments,
      });
    } catch (error) {
      console.log('get comments : ', error);

      next(error);
    }
  },

  getCommentByTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.query.taskId;
      const taskComment = await CommentService.getCommentByTask(
        taskId as string,
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data komentar',
        statusCode: HttpStatusCode.OK,
        data: taskComment,
      });
    } catch (error) {
      next(error);
    }
  },

  getCommentById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const comment = await CommentService.getCommentById(id);

      return res.json({
        message: 'Berhasil mendapatkan semua data komentar',
        statusCode: HttpStatusCode.OK,
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default commentController;
