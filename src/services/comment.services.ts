import prisma from '../config/prisma-client.config';
import {
  ICreateCommentRequestParams,
  IGetAllCommentRequest,
} from '../interfaces/comment.interfaces';

class CommentService {
  static async createComments(payload: ICreateCommentRequestParams) {
    try {
      const comment = await prisma.comment.create({
        data: {
          ...payload,
          userId: payload.userId,
          taskId: payload.taskId,
        },
        include: {
          task: true,
          user: true,
        },
      });

      return comment;
    } catch (error) {
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
              fullname: true,
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
}

export default CommentService;
