import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/config/toastConfig';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
    'Montserrat-ExtraLight': require('../assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-Black': require('../assets/fonts/montserrat/Montserrat-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>

        <Toast config={toastConfig} />

        <StatusBar backgroundColor="white" style="dark" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

