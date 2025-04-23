import React from 'react';
import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <>
      <Stack
        initialRouteName="index"
        screenOptions={{
          contentStyle: { backgroundColor: '#f6f6f9' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
