export interface ICreateInvoiceRequestParams {
  invoicesTitle: string;
  otherInfo?: string;
  clientId: string;
}

export interface IInvoiceClientRequestParams {
  invoicesTitle: string;
  otherInfo?: string;
  clientId: string;
  orderId: string;
  project: {
    id: string;
    projectName: string;
    description: string;
    price: number;
    image?: string;
    projectIcon: string;
    platform: string;
  };
}

export interface ISenderInvoiceRequestParams {
  receiverEmail: string;
  subject: string;
  data: {
    invoicesTitle: string;
  };
}
