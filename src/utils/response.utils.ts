import { HttpStatusCode } from '../constants/responses.constant';

type ResponseTypes = {
  statusCode: number;
  status?: 'SUCCESS' | 'FAILED';
  data: any;
};

type ResponseTypesParams = {
  statusCode: number;
  message: string;
  data: any;
};

const responseType = {
  successResponse: ({ statusCode, message, data }: ResponseTypesParams) => {
    const response: ResponseTypesParams = {
      statusCode,
      message,
      data,
    };

    return response;
  },
};

export default responseType;
