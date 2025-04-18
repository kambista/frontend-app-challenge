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
