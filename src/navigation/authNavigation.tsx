import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import { AuthStackParamList } from "./navigation.types";
import { createStaticNavigation } from "@react-navigation/native";

const AuthStack = createNativeStackNavigator<AuthStackParamList>({
    initialRouteName: "Login",
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
    }
});

export const AuthNavigation = createStaticNavigation(AuthStack);