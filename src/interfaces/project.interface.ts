export interface ICreateProjectRequestParams {
  projectName: string;
  description: string;
  startedDate?: Date;
  endDate?: Date;
  price: number;
  image: string;
  projectIcon: string;
  clientId: string;
  taskId?: number;
  member?: any[];
  payrollId?: number;
  platform: any;
}

export interface IUploadProjectFilesParams {
  projectIcon: string;
  image: string;
}

export interface IInviteMemberParamsType {
  projectId: string;
  member: string;
}
