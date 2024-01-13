export interface ICreateCommentRequestParams {
  message: string;
  userId: string;
  taskId: number | string;
}

export interface IGetAllCommentRequest {
  userId?: string;
  taskId?: number;
}

export interface IReadMembersResponseParams {
  id: string;
  name: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: Date;
}
