import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoginState {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: Record<'email' | 'password', string>;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setRememberMe: (v: boolean) => void;
  validate: () => boolean;
  resetErrors: () => void;
}
export const useLoginForm = create<LoginState>()(
  devtools((set, get) => ({
    email: '',
    password: '',
    rememberMe: false,
    errors: { email: '', password: '' },
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setRememberMe: (rememberMe) => set({ rememberMe }),
    resetErrors: () => set({ errors: { email: '', password: '' } }),
    validate: () => {
      const errs: any = {};
      const { email, password } = get();
      if (!email || !/^\S+@\S+\.\S+$/.test(email))
        errs.email = 'Ingresa un correo válido';
      if (!password) errs.password = 'Ingresa contraseña';
      else if (password.length < 6) errs.password = 'Mínimo 6 caracteres';
      set({
        errors: { email: errs.email || '', password: errs.password || '' },
      });
      return Object.keys(errs).length === 0;
    },
  })),
);
