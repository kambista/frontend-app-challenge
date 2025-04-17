export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  fecha_alta: string;
  fecha_baja: string;
  domg_estuser: number;
  desc_Domg_estuser: string;
  token: string;
  navigation: string;
}
