import { User } from '@/models';
import AuthService from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const useAuth = () => {
  const { login: loginStore, logout: logoutStore, userData } = useAuthStore();

  const register = (user: User) => {
    try {
      const response = AuthService.register(user);
      if (response.success) {
        const payload = { email: user.email, password: user.password };
        return login(payload);
      }
    } catch (err) {
      console.error('Error', err);
    }
  };

  const login = (values: { email: string; password: string }) => {
    try {
      const response = AuthService.login(values);
      console.log(response);
      if (response.success) {
        loginStore(response.data, 'token');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('ERROR', err);
      return false;
    } finally {
    }
  };

  const logout = () => {
    logoutStore();
  };

  return { login, logout, register, userData };
};

export default useAuth;
