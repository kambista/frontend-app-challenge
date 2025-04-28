import { create } from 'zustand';

export enum Currencies {
  'USD' = 'USD',
  'PEN' = 'PEN',
}

interface Operation {
  coupon: string;
  exchange: number;
  incoming: number,
  incomingCurrency: Currencies,
  outcomingCurrency: Currencies,
  bid: number,
  ask: number,
}

interface OperationExchangeState {
  operation: Operation;
  setOperation: (operation: Partial<Operation>) => void;
}

export const useOperation = create<OperationExchangeState>((set) => ({
  operation: {
    coupon: '',
    exchange: 0,
    incoming: 0,
    bid: 0,
    ask: 0,
    incomingCurrency: Currencies.PEN,
    outcomingCurrency: Currencies.USD,
  },
    setOperation: (updatedFields) =>
      set((state) => ({
        operation: { ...state.operation, ...updatedFields },
      })),
  }));
