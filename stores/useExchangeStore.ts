import { create } from "zustand";

interface AmountInfo {
  amount: number | null;
  currency: string | null;
}

interface Exchange {
  amountIn: AmountInfo | null;
  amountOut: AmountInfo | null;
  ask: number | undefined;
  bid: number | undefined;
  couponCode: string | null;
}

interface ExchangeState {
  exchangeData: Exchange | null;
  setExchangeData: (data: Exchange) => void;
  clearExchangeData: () => void;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  exchangeData: null,
  setExchangeData: (data) => set({ exchangeData: data }),
  clearExchangeData: () => set({ exchangeData: null })
}));
