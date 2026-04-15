export type LoginPayload = {
    email: string;
    password: string;
};

export type TipoDocumento = "dni" | "cce" | "pasaporte";

export type RegisterPayload = {
    email: string;
    password: string;
    nombresCompletos: string;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    celular: string;
    fechaNacimiento: string;
};

export type RegisterUser = {
    id: number;
    email: string;
    nombresCompletos: string;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    celular: string;
    fechaNacimiento: string;
};

export type AuthSuccessData = {
    user: RegisterUser;
    accessToken: string;
    refreshToken: string;
};

export type RegisterSuccessResponse = {
    success: true;
    data: AuthSuccessData;
};