import AuthService from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const { login: loginStore, logout: logoutStore } = useAuthStore();

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const resp = await AuthService.login({
        email: values.email,
        password: values.password,
      });

      if (resp.token) {
        loginStore({ ...resp }, resp.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error('ERROR', err);
      // ShowError(`Error al iniciar sesión ${err}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutStore();
  };

  return { login, logout, loading };
};

export default useAuth;
