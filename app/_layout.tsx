import { ScreenWrapper } from "@/components/ScreenWrapper";
import "@/global.css";
import { queryClient } from "@/services/queryClient";
import { storageInitializer } from "@/services/storage/storageInitializer";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/utils/cn";
import { log } from "@/utils/logger";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_900Black,
  useFonts
} from "@expo-google-fonts/montserrat";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = React.useState(false);
  const segments = useSegments();
  const router = useRouter();
  const { user } = useAuthStore();

  const [loaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_900Black,
    Montserrat_400Regular_Italic
  });

  const isAuthGroup = segments[0] === "(auth)";
  const isMainScreenGroup =
    segments[0] === "(tabs)" || segments[0] === "(operations)";
  const isOnOperationsGroup = segments[0] === "(operations)";

  useEffect(() => {
    if (!isAppReady) return;
    if (!user && !isAuthGroup) {
      router.replace("/(auth)/login");
      return;
    }

    if (user?.hasCompletedOnboarding && isAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [user, segments, isAppReady]);

  useEffect(() => {
    if (!loaded) return;
    const initializeApp = async () => {
      try {
        await storageInitializer.initializeData();
      } catch (error) {
        log.error(error);
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <ScreenWrapper
          safeViewBottomClassName={cn(
            isOnOperationsGroup ? "bg-gray-10" : "bg-white"
          )}
          safeViewTopClassName={cn(
            isMainScreenGroup ? "bg-gray-10" : "bg-white"
          )}
        >
          <Slot />
        </ScreenWrapper>
      </QueryClientProvider>
      <Toast topOffset={Platform.OS === "ios" ? 60 : 50} />
    </>
  );
}
