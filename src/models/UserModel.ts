import ResponseStatus from "./ResponseStatus";

export interface UserInfo {
  _id: string;
  userName: string;
  isAdmin: boolean;
  creationDate: Date;
}

export interface UserInfoResponse {
  status: ResponseStatus;
  result: null | UserInfo;
}

export default UserInfo;
