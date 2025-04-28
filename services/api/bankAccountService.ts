import {
  IBankAccount,
  IBankAccountPayload
} from "@/types/storage/IBankAccount";
import { IErrorResponse, IResponse } from "@/types/utils/requests";
import { STORAGE_KEYS } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

class BankAccountService {
  private static instance: BankAccountService;

  public static getInstance(): BankAccountService {
    if (!BankAccountService.instance) {
      BankAccountService.instance = new BankAccountService();
    }
    return BankAccountService.instance;
  }

  async getBankAccounts(): Promise<IBankAccount[]> {
    const banksAccountsString = await AsyncStorage.getItem(
      STORAGE_KEYS.BANK_ACCOUNTS_KEY
    );
    const banksAccounts: IBankAccount[] = banksAccountsString
      ? JSON.parse(banksAccountsString)
      : [];
    return banksAccounts;
  }

  async saveBankAccountData(
    data: IBankAccountPayload,
    userUuid: string
  ): Promise<IResponse<IBankAccount> | IErrorResponse> {
    try {
      const id = uuid.v4();
      const payload: IBankAccount = {
        ...data,
        userUuid,
        uuid: id
      };

      const accounts = await this.getBankAccounts();
      accounts.push(payload);
      await AsyncStorage.setItem(
        STORAGE_KEYS.BANK_ACCOUNTS_KEY,
        JSON.stringify(accounts)
      );

      return {
        success: true,
        data: payload
      };
    } catch (error) {
      return {
        success: false,
        data: {
          name: "BANK_ACCOUNT_SAVE_ERROR",
          title: "Error al guardar datos",
          message: "No se pudieron guardar los datos de la cuenta bancaria."
        }
      };
    }
  }
}

export const bankAccountService = BankAccountService.getInstance();
