interface ResponseStatus {
  success: boolean;
  message: string,
  details: string | null;
}

export interface DefaultResponseStatus {
  status: ResponseStatus;
  result: null;
}

export default ResponseStatus;
