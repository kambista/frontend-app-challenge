import { create } from 'zustand';



interface StepState {
  step: number;
  setStep: (step: number) => void;
}

export const useStepOperationStore = create<StepState>((set) => ({
  step: 0,
  setStep: (newStep) =>
    set(() => ({
      step: newStep,
    })),
}));