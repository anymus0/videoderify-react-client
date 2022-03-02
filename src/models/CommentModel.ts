import { UserInfo } from "./UserModel";
import { ResponseStatus } from './ResponseStatus'

export interface Comment {
  _id: string;
  text: string;
  date: Date;
  commentedBy: UserInfo | null;
}

export interface CommentResponse {
  status: ResponseStatus;
  result: Comment;
}
