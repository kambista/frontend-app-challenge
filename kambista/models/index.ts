export interface Bank {
  id: string;
  name: string;
  alias: string;
}

export interface SourceFund {
  _id: string;
  name: string;
}

export interface Account {
  id: string;
  entity: string;
  currency: string;
  account_number: string;
  account_name: string;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
}

export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  document_id: number;
  document_number: number;
  phone_number: number;
  birthdate: string;
  last_bank_id?: number;
}
