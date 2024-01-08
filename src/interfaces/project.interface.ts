export interface ICreateProjectRequestParams {
  projectName: string;
  description: string;
  startedDate: Date;
  endDate: Date;
  price: number;
  image: string;
  projectIcon: string;
  clientId?: string;
  taskId?: number;
  memberId?: string[];
  payrollId?: number;
}
