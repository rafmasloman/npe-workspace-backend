export interface ICreateTaskRequestParams {
  name: string;
  startedDate: Date;
  endDate: Date;
  member: string[];
  projectId: string;
  milestoneId?: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
}

export interface IReadTasksResponseParams {
  id: string;
  name: string;
  startedDate: Date;
  endDate: Date;
  memberId: string;
  status: string;
}

export enum StatusProgress {
  TODO,
  ON_PROGRESS,
  COMPLETED,
}
