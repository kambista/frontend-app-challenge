export type FillOutTypes = {
  bankOrigin: string;
  depositAccount: string;
  fundOrigin: string;
};

export interface IBankAccountOption {
  label: string;
  value: string;
  data: {
    accountNumber: string;
    currency: string;
    bankName: string;
  };
}
