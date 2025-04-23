import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/models';
import { Users } from '@/constants/Backend';

interface AuthState {
  users: User[];
  isLoggedIn: boolean;
  userData: any | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  addUser: (user: User) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      users: Users,
      isLoggedIn: false,
      userData: null,
      token: null,
      login: (userData: any, token: string) => set({ isLoggedIn: true, userData: userData, token: token }),
      logout: () => set({ isLoggedIn: false, userData: null }),
      addUser: (user: User) =>
        set((state) => ({
          users: [...state.users, user],
        })),
    }),
    {
      name: 'auth-storage', // Nombre para la clave en AsyncStorage, debe ser único
      storage: createJSONStorage(() => AsyncStorage), // Persistencia de datos
    }
  )
);
