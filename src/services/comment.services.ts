import prisma from '../config/prisma-client.config';
import {
  ICreateCommentRequestParams,
  IGetAllCommentRequest,
} from '../interfaces/comment.interfaces';
import Server from 'socket.io';
class CommentService {
  static async createComments(payload: ICreateCommentRequestParams) {
    try {
      const comment = await prisma.comment.create({
        data: {
          ...payload,
          userId: payload.userId,
          taskId: Number(payload.taskId),
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return comment;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getAllComments({ taskId, userId }: IGetAllCommentRequest) {
    try {
      const comments = prisma.comment.findMany({
        // where: {
        //   taskId,
        //   userId,
        // },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              member: {
                select: {
                  position: true,
                },
              },
            },
          },
        },
      });

      return comments;
    } catch (error) {
      throw error;
    }
  }

  static async getCommentByTask(taskId: string) {
    try {
      const comments = prisma.comment.findMany({
        where: {
          task: {
            id: Number(taskId),
          },
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              member: {
                select: {
                  position: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
      });

      return comments;
    } catch (error) {
      throw error;
    }
  }

  static async getCommentById(id: number) {
    try {
      const comment = prisma.comment.findUnique({
        where: {
          id,
        },
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
