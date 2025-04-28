import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useAuthStore } from "../src/features/auth/store/auth";
import { useEffect } from "react";
import { toastConfig } from "../src/features/common/components/custom-toast";

export default function Layout() {

    const { revalidate } = useAuthStore();

    useEffect(() => {
        revalidate();
    }, []);

    return (
        <>
            <StatusBar
                hidden={true}
                translucent={true}
            />
            <Stack
                initialRouteName="index"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="profile-completed" />
            </Stack>

            <Toast config={toastConfig} />
        </>
    );
}