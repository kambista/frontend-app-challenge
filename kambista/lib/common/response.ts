export interface Response<T> {
  success: boolean;
  data: T | ErrorResponse;
}

interface ErrorResponse {
  name: 'DUPLICATE_DNI' | 'DUPLICATE_EMAIL' | 'INVALID_PHONE' | 'SERVER_ERROR' | 'USER_NOT_FOUND' | 'INVALID_PASSWORD';
  title: string;
  message: string;
}