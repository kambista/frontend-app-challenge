type ErrorName =
  | "INVALID_PHONE"
  | "DUPLICATE_DNI"
  | "SERVER_ERROR"
  | "INVALID_EMAIL"
  | "INVALID_PASSWORD"
  | "ONBOARDING_SAVE_ERROR"
  | "BANK_ACCOUNT_SAVE_ERROR";

interface IError {
  name: ErrorName;
  title: string;
  message: string;
}

export interface IErrorResponse {
  success: boolean;
  data?: IError;
}

export interface IResponse<T> {
  success: boolean;
  data?: T;
}
