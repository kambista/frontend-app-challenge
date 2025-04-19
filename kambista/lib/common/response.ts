export interface Response<T> {
  success: boolean;
  data: T | ErrorResponse;
}

interface ErrorResponse {
  name: string;
  title: string;
  message: string;
}