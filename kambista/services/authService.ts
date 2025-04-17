import { instance } from "@/lib/axios/config";
import { LoginRequest, LoginResponse } from "@/models/dto/authDTO";


const AuthService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await instance.post<LoginResponse>(`/Pla_user/login`, request);
    return response.data;
  },
}

export default AuthService;