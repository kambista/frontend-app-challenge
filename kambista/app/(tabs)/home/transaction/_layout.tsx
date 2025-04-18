import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import useUI from '@/hooks/useUI';

export default function UserLayout() {
  const { hideTabBar } = useUI();

  useEffect(() => {
    hideTabBar();
  }, []);

  return (
    <>
      <Stack
        initialRouteName="complete"
        screenOptions={{
          contentStyle: { backgroundColor: '#f6f6f9' },
        }}
      >
        <Stack.Screen name="complete" options={{ headerShown: false }} />
        <Stack.Screen name="constancy" options={{ headerShown: false }} />
        <Stack.Screen name="transfer" options={{ headerShown: false }} />
        <Stack.Screen name="finish_transaction" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
