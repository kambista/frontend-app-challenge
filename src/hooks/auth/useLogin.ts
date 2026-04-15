import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import type { ApiErrorBody } from "../../type/apiResponse.type";
import type { LoginPayload } from "../../services/auth/auth.types";
import { login } from "../../services/auth/auth.service";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async (payload: LoginPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(payload);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                const body = err.response?.data as ApiErrorBody | undefined;
                const message =
                    body?.data?.message ??
                    err.message ??
                    "Error al iniciar sesión";
                setError(message);
            } else {
                setError("Error al iniciar sesión");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        submit,
        isLoading,
        error,
    };
}
