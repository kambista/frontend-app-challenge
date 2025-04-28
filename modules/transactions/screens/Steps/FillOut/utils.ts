import bankAccounts from "@/mocks/bankAccounts.json";
import fundsOrigin from "@/mocks/sourceFunds.json";
import { IBank } from "@/types/mocks/IBanks";
import { ISourceFund } from "@/types/mocks/ISourceFund";
import { IBankAccount } from "@/types/storage/IBankAccount";
import { bankLogos } from "@/utils/helpers";
import { FillOutTypes, IBankAccountOption } from "./types";

export const defaultValues: FillOutTypes = {
  bankOrigin: "",
  depositAccount: "",
  fundOrigin: ""
};

const COUPON_MOCK = {
  code: "MICASA21",
  discount: {
    amount: 10,
    type: "percentage"
  }
};

export const banksDelay = ["BCP", "Interbank", "BanBif", "Pichincha"];

export const bankAccountOptions = () => {
  const banks = JSON.parse(JSON.stringify(bankAccounts)) as IBank[];

  return banks.map((bank) => {
    return {
      label: bank.name,
      value: bank.alias,
      data: { imageSrc: bankLogos[Number(bank.id)] }
    };
  });
};

export const fundOriginOptions = () => {
  const funds = JSON.parse(JSON.stringify(fundsOrigin)) as ISourceFund[];
  return funds.map((fund) => ({ label: fund.name, value: fund._id }));
};

export const getExchangeRateDiscounted = (amount: number) => {
  const discount = COUPON_MOCK.discount.amount;
  const type = COUPON_MOCK.discount.type;

  let discountAmount = 0;
  if (type === "percentage") discountAmount = (amount * discount) / 100;
  else if (type === "fixed") discountAmount = discount;

  return amount - discountAmount;
};

export const getBankAccountOptions = (
  bankAccounts: IBankAccount[]
): IBankAccountOption[] => {
  if (!bankAccounts) return [];
  const bankAccountOptions = bankAccounts?.map((bank) => {
    return {
      label: bank.accountAlias,
      value: bank.accountNumber,
      data: {
        accountNumber: bank.accountNumber,
        currency: bank.currencySymbol,
        bankName: bank.bankName
      }
    };
  });
  return bankAccountOptions;
};
