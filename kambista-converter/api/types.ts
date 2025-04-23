export interface RegisterPayload {
  name: string;
  documentType: 'dni' | 'cce' | 'passport';
  documentNumber: string;
  phone: string;
  birthDate: string;
  lastExchange?: string;
}

export interface APIError {
  success: false;
  data: {
    name: 'DUPLICATE_DNI' | 'INVALID_PHONE' | 'SERVER_ERROR';
    title: string;
    message: string;
  };
}

export interface RegisterResponse {
  success: true;
  data: {
    userId: string;
    token: string;
  };
}
