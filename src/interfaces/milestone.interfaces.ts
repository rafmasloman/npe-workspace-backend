export interface ICreateMilestoneRequestParams {
  milestoneName: string;
  projectId: string;
  startedDate?: Date;
  endDate?: Date;
  member: string[];
  status: 'TODO' | 'ON_PROGRESS' | 'COMPLETED';
}
