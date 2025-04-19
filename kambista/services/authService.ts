import { Response } from '@/lib/common/response';
import { User } from '@/models';
import { useAuthStore } from '@/store/authStore';

const AuthService = {
  login(values: { email: string; password: string }): Response<User> {
    try {
      const { users } = useAuthStore.getState();
      const user = users.find((user) => user.email === values.email);

      if (!user) {
        return {
          success: false,
          data: {
            name: 'USER_NOT_FOUND',
            title: 'Usuario no encontrado',
            message: 'El correo electrónico no está registrado.',
          },
        };
      }

      if (user.password !== values.password) {
        return {
          success: false,
          data: {
            name: 'INVALID_PASSWORD',
            title: 'Contraseña incorrecta',
            message: 'La contraseña ingresada no es válida.',
          },
        };
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        data: {
          name: 'SERVER_ERROR',
          title: 'Error del servidor',
          message: 'Ocurrió un error inesperado. Inténtalo nuevamente.',
        },
      };
    }
  },

  register(userData: Omit<User, 'id'>): Response<User> {
    try {
      const { users, addUser } = useAuthStore.getState();
      // Validar email duplicado
      const emailExists = users.some((user) => user.email === userData.email);
      if (emailExists) {
        return {
          success: false,
          data: {
            name: 'DUPLICATE_EMAIL',
            title: 'Email en uso',
            message: 'El correo electrónico ya está registrado.',
          },
        };
      }

      // Validar DNI duplicado
      const dniExists = users.some((user) => user.document_id === userData.document_id && user.document_number === userData.document_number);
      if (dniExists) {
        return {
          success: false,
          data: {
            name: 'DUPLICATE_DNI',
            title: 'DNI en uso',
            message: 'El número de documento ya está registrado.',
          },
        };
      }

      // Crear nuevo usuario
      const newUser: User = {
        ...userData,
        id: Math.max(...users.map((u) => u.id), 0) + 1, // Auto-increment ID
      };

      addUser(newUser);

      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        data: {
          name: 'REGISTRATION_ERROR',
          title: 'Error en registro',
          message: 'Ocurrió un error durante el registro. Inténtalo nuevamente.',
        },
      };
    }
  },
};

export default AuthService;
