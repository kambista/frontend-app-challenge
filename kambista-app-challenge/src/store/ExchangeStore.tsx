import { create } from 'zustand';
import axios from 'axios';

interface Exchange {
  bid: number;
  bidChange: number;
  ask: number;
  askExchange: number;
  date: string,
}

interface ExchangeState {
  exchange: Exchange;
  isLoading: boolean;
  fetchExchange: () => Promise<void>;
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  exchange: {
    bid: 0.00,
    bidChange: 0,
    ask: 0.00,
    askExchange: 0,
    date: ''
  },
  isLoading: false,
  fetchExchange: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get<Exchange>('https://api.kambista.com/v1/exchange/kambista/current');
      set({ exchange: response.data });
    } catch (error) {
      console.error('Error fetching exchange', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
