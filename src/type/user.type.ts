import { TipoDocumento } from "../services/auth/auth.types";

export type User = {
    id: number;
    email: string;
    nombresCompletos: string;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    celular: string;
    fechaNacimiento: string;
}