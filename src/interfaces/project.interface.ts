export interface ICreateProjectRequestParams {
  projectName: string;
  description: string;
  startedDate: Date;
  endDate: Date;
  price: number;
  image: string;
  clientId: string;
  taskId: number;
}
