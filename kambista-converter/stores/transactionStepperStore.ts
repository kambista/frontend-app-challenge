import { create } from 'zustand';

interface TransactionStepperStore {
  step: number;
  setStep: (step: number) => void;
  resetStep: () => void;
}

export const useTransactionStepperStore = create<TransactionStepperStore>(
  (set) => ({
    step: 0,
    setStep: (step) => set({ step }),
    resetStep: () => set({ step: 0 }),
  }),
);
