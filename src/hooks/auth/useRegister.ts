import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import type { ApiErrorBody } from "../../type/apiResponse.type";
import type { RegisterPayload } from "../../services/auth/auth.types";
import { register } from "../../services/auth/auth.service";

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async (payload: RegisterPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await register(payload);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                const body = err.response?.data as ApiErrorBody | undefined;
                const message =
                    body?.data?.message ??
                    err.message ??
                    "Error al registrarse";
                setError(message);
            } else {
                setError("Error al registrarse");
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
