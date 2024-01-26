import { IRoleDetailResponse } from './role.interface';

export interface IUserDetailResponse {
  id: string;
  email: string;
  fullname: string;
  role: IRoleDetailResponse;
}
