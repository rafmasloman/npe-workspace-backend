export interface ICreatePayrollRequestParams {
  percent: number;
  payment: string;
  totalPayment: number;
  date: Date;
  memberId: string;
  projectId: string;
}

export interface IReadPayrollResponseParams {
  id: number;
  percent: number;
  payment: string;
  totalPayment: number;
  date: Date;
  memberId: string;
  projectId: string;
}
