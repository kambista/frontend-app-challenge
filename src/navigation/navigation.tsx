import ProfileSuccessScreen from "../screens/Auth/ProfileSuccessScreen";
import { useAuthStore } from "../stores/auth/authStore";
import { AppNavigation } from "./appNavigation";
import { AuthNavigation } from "./authNavigation";

export function Navigation() {
    const user = useAuthStore((state) => state.user);
    const postRegisterSuccessPending = useAuthStore(
        (state) => state.postRegisterSuccessPending,
    );

    if (user && postRegisterSuccessPending) {
        return <ProfileSuccessScreen />;
    }

    if (user) return <AppNavigation />;

    return <AuthNavigation />;
}