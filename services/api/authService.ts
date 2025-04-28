import { IErrorResponse, IResponse } from "@/types/utils/requests";
import { storageInitializer } from "../storage/storageInitializer";
import { IUser } from "@/types/storage/IUser";

class AuthService {
  private static instance: AuthService;

  static getInstance() {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  async login(
    email: string,
    password: string
  ): Promise<IResponse<IUser> | IErrorResponse> {
    const users = await storageInitializer.getUsers();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    const emailFound = users.find((user) => user.email === email);
    const passwordFound = users.find((user) => user.password === password);

    let error: IErrorResponse = { success: true };

    if (!user) {
      if (!emailFound) {
        error = {
          success: false,
          data: {
            name: "INVALID_EMAIL",
            title: "Correo electrónico no existente",
            message: "El correo electrónico no existe en nuestros registros."
          }
        };
      } else if (!passwordFound) {
        error = {
          success: false,
          data: {
            name: "INVALID_PASSWORD",
            title: "Contraseña inválida",
            message: "La contraseña no es correcta."
          }
        };
      }

      throw error;
    }

    return {
      success: true,
      data: user
    };
  }
}

export const authService = AuthService.getInstance();
