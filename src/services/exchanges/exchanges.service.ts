import { apiClient } from "../../api/client";
import type { ApiListResponse } from "../../type/apiResponse.type";
import type {
    Bank,
    CreateCuentaUsuarioPayload,
    CuentaUsuario,
    Exchange,
    SourceFund,
} from "./exchanges.types";

export async function getExchanges() {
    return apiClient.get<ApiListResponse<Exchange>>("exchange/current");
}

export async function getBanks() {
    return apiClient.get<ApiListResponse<Bank[]>>("banks");
}

export async function getSourceFunds() {
    return apiClient.get<ApiListResponse<SourceFund[]>>("source-funds");
}

export async function getCuentasUsuario(userId: number) {
    return apiClient.get<ApiListResponse<CuentaUsuario[]>>("cuentas-usuario", {
        params: { userId },
    });
}

export async function createCuentaUsuario(payload: CreateCuentaUsuarioPayload) {
    return apiClient.post<ApiListResponse<CuentaUsuario>>(
        "cuentas-usuario",
        payload,
    );
}
