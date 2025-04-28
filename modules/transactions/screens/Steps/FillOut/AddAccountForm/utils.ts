import { ISelectOption } from "@/types/utils/options";
import { BankAccountFormTypes } from "./types";
import bankAccounts from "@/mocks/bankAccounts.json";

export const defaultValues: BankAccountFormTypes = {
  accountType: "",
  bankName: "",
  accountNumber: "",
  accountAlias: "",
  isMyAccount: false
};

export const accountTypes: ISelectOption[] = [
  { label: "Ahorros", value: "savings" },
  { label: "Corriente", value: "current" }
];

export const getFinancialEntities = () => {
  return bankAccounts.map((bank) => ({ label: bank.name, value: bank.alias }));
};
