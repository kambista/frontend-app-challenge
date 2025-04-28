import { create } from 'zustand';
import axios from 'axios';
import { Currencies } from './OperationStore';

interface OperationExchange {
  rate: number;
  exchange: number;
  savings: {amount: number, currency: string};
}

interface OperationExchangeState {
  operation: OperationExchange;
  isLoading: boolean;
  fetchOperation: (input: number, currencyInput: Currencies, currencyOutput: Currencies) => Promise<void>;
}

export const useOperationExchange = create<OperationExchangeState>((set) => ({
  operation: {
    rate: 0.00,
    exchange: 0,
    savings: {
      amount: 0,
      currency: 'USD'
    }
  },
  isLoading: false,
  fetchOperation: async (input, currencyInput, currencyOutput) => {
    set({ isLoading: true });
    try {
      const response = await axios.get<OperationExchange>(`https://api.kambista.com/v1/exchange/calculates?originCurrency=${currencyInput}&destinationCurrency=${currencyOutput}&amount=${input}&active=S`);
      set({ operation: response.data });
    } catch (error) {
      console.error('Error fetching exchange', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
