import ResponseStatus from './ResponseStatus';
import User from './UserModel';


interface mediaFile {
  mimetype: string;
  size: number;
  filename: string;
}

interface Series {
  _id: string,
  name: string;
  description: string;
  thumb: string;
  mediaFiles: mediaFile[];
  uploadedBy: User;
}

export interface SeriesResponse {
  status: ResponseStatus;
  result: null | Series;
}