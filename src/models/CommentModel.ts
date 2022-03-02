import { UserInfo } from "./UserModel";

export interface Comment {
  _id: string;
  text: string;
  date: Date;
  commentedBy: UserInfo | null;
}
