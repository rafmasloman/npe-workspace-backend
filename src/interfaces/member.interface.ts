export interface ICreateMemberRequestParams {
  name: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: Date;
  userId: string;
}

export interface IReadMembersResponseParams {
  id: string;
  name: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: Date;
}
