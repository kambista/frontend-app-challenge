import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Bank, SourceFund } from '@/models';
import { CalculatorRequest, CalculatorResponse } from '@/models/dto/exchangeDTO';

interface TransactionState {
  calculatorRequest: CalculatorRequest | undefined;
  calculatorResponse: CalculatorResponse | undefined;
  coupon: string | undefined;
  bank: Bank | undefined;
  account: Account | undefined;
  sourceFund: SourceFund | undefined;
  setCalculatorRequest: (calculator: CalculatorRequest) => void;
  setCalculatorResponse: (calculator: CalculatorResponse) => void;
  setBank: (bank: Bank) => void;
  setAccount: (account: Account) => void;
  setSourceFund: (sourceFund: SourceFund) => void;
  setCoupon: (coupon?: string) => void;

  resetTransaction: () => void;
}
export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      calculatorRequest: undefined,
      calculatorResponse: undefined,
      coupon: undefined,
      bank: undefined,
      account: undefined,
      sourceFund: undefined,
      setCalculatorRequest: (calculator: CalculatorRequest) => set({ calculatorRequest: calculator }),
      setCalculatorResponse: (calculator: CalculatorResponse) => set({ calculatorResponse: calculator }),
      setBank: (bank: Bank) => set({ bank: bank }),
      setAccount: (account: Account) => set({ account: account }),
      setSourceFund: (sourceFund: SourceFund) => set({ sourceFund: sourceFund }),
      setCoupon: (coupon?: string) => set({ coupon: coupon }),
      resetTransaction: () => {
        set({
          calculatorRequest: undefined,
          calculatorResponse: undefined,
          coupon: undefined,
          bank: undefined,
          account: undefined,
          sourceFund: undefined,
        });
      },
    }),
    {
      name: 'transaction-storage', // Nombre para la clave en AsyncStorage, debe ser único
      storage: createJSONStorage(() => AsyncStorage), // Persistencia de datos
    }
  )
);
