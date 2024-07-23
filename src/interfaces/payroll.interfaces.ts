export interface ICreatePayrollRequestParams {
  percent: number;

  transactionStatus: 'UNPAID' | 'PAID';
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

enum BankProvider {
  'BRI',
  'BNI',
  'BSI',
  'BCA',
  'Mandiri',
  'Gopay',
  'Dana',
  'Ovo',
}
