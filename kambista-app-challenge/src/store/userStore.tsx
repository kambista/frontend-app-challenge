import { create } from 'zustand';

export interface User {
  name: string;
  dni: string;
  phone: string;
  birthdate: string;
  lastExchangePlace?: string;
}

interface UserState {
  user: User;
  setUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: '',
    dni: '',
    phone: '',
    birthdate: '',
  },
  setUser: (updatedFields) =>
    set((state) => ({
      user: { ...state.user, ...updatedFields },
    })),
}));