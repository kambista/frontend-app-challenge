import { apiClient } from "../../api/client";
import type { ApiListResponse } from "../../type/apiResponse.type";
import type {
    AuthSuccessData,
    LoginPayload,
    RegisterPayload,
} from "./auth.types";

export async function login(payload: LoginPayload) {
    const response = await apiClient.post<ApiListResponse<AuthSuccessData>>(
        "auth/login",
        payload,
    );
    return response;
}

export async function register(payload: RegisterPayload) {
    return apiClient.post<ApiListResponse<AuthSuccessData>>(
        "auth/register",
        payload,
    );
}