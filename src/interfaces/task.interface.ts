export interface ICreateTaskRequestParams {
  name: string;
  startedDate: Date;
  endDate: Date;
  member: string[];
  projectId: string;
  milestoneId?: number;
  status: 'To Do' | 'On Progress' | 'Complete';
}

export interface IReadTasksResponseParams {
  id: string;
  name: string;
  startedDate: Date;
  endDate: Date;
  memberId: string;
  status: string;
}
