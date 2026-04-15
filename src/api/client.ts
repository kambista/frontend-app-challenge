import axios from "axios";
import { useAuthStore } from "../stores/auth/authStore";

export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Interceptor de solicitud para agregar el token de autenticación
apiClient.interceptors.request.use((config) => {
    const url = config.url;
    const isAuthRoute = url?.includes("auth");    

    if (!isAuthRoute) {
        const token = useAuthStore.getState().accessToken;

        if (token) config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

// Interceptor de respuesta
apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        useAuthStore.getState().clearSession();
    }
    return Promise.reject(error);
});