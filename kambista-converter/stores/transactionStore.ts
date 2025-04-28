import { create } from 'zustand';

interface TransactionData {
  sendAmount: string;
  receiveAmount: string;
  coupon?: string;
  usedRate: string;
  marketRate: string;
  fromBank: string;
  fromBankName: string;
  toAccount: string;
  fundSource: string;
  operationNumber?: string;
}

interface TransactionStore {
  transaction: TransactionData | null;
  setTransaction: (data: TransactionData) => void;
  setOperationNumber: (number: string) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: null,
  setTransaction: (data) => set({ transaction: data }),
  setOperationNumber: (number) =>
    set((state) => ({
      transaction: state.transaction
        ? { ...state.transaction, operationNumber: number }
        : null,
    })),
  clearTransaction: () => set({ transaction: null }),
}));
