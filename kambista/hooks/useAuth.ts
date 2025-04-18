import { Users } from '@/constants/Backend';
import AuthService from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { Logger } from '@/utils/logger';
import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const { login: loginStore, logout: logoutStore } = useAuthStore();

  const login = (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const userExists = Users.some((user) => user.email === values.email && user.password === values.password);

      if (userExists) {
        loginStore(userExists, 'token');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('ERROR', err);
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
