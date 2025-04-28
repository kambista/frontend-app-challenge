export interface IBankAccount {
  uuid: string;
  userUuid: string;
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountAlias: string;
  currencySymbol: string;
}

export interface IBankAccountPayload {
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountAlias: string;
  currencySymbol: string;
}
