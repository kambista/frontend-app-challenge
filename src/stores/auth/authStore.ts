import { create } from "zustand"
import { User } from "../../type/user.type";

type AuthState = {
    user: User | null,
    accessToken: string
    postRegisterSuccessPending: boolean
    setSession: (payload: { user: User | null, accessToken: string }) => void,
    setPostRegisterSuccessPending: (value: boolean) => void,
    clearSession: () => void,
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: "",
    postRegisterSuccessPending: false,
    setSession: (payload) => {
        set({ user: payload.user ?? null, accessToken: payload.accessToken ?? "" });
    },
    setPostRegisterSuccessPending: (value) => {
        set({ postRegisterSuccessPending: value });
    },
    clearSession: () => {
        set({ user: null, accessToken: "", postRegisterSuccessPending: false });
    },
}));