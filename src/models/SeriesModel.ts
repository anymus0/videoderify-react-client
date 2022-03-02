import ResponseStatus from "./ResponseStatus";
import User from "./UserModel";
import { Comment } from "./CommentModel";

interface mediaFile {
  mimetype: string;
  size: number;
  filename: string;
}

export interface Series {
  _id: string;
  name: string;
  description: string;
  thumb: string;
  mediaFiles: mediaFile[];
  uploadedBy: User;
  comments: Comment[];
}

export interface SeriesResponse {
  status: ResponseStatus;
  result: null | Series;
}

export interface AllSeriesResponse {
  status: ResponseStatus;
  result: null | Series[];
}
