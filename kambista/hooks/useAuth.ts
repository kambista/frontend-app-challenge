import { User } from '@/models';
import AuthService from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { ShowError } from '@/utils/toast';

const useAuth = () => {
  const { login: loginStore, logout: logoutStore, userData } = useAuthStore();

  const register = (user: User) => {
    try {
      const response = AuthService.register(user);
      if (response.success == true) {
        const payload = { email: user.email, password: user.password };
        return login(payload);
      } else {
        ShowError(response.data.title, response.data.message);
        return false;
      }
    } catch (err) {
      console.error('Error', err);
    }
  };

  const login = (values: { email: string; password: string }) => {
    try {
      const response = AuthService.login(values);
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
