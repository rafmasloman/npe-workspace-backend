export interface ICreateTaskRequestParams {
  name: string;
  startedDate: Date;
  endDate: Date;
  memberId: string;
  projectId: string
}

export interface IReadTasksResponseParams {
  id: string;
  name: string;
  startedDate: Date;
  endDate: Date;
  memberId: string;
}
