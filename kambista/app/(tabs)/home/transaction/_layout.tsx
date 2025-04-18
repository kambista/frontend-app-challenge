import React from "react";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <>
      <Stack 
        initialRouteName="complete"
        screenOptions={{
          contentStyle: { backgroundColor: "#f6f6f9" },
        }}
      >
        <Stack.Screen name="complete" options={{ headerShown: false }} />
        <Stack.Screen name="constancy" options={{ headerShown: false }} />
        <Stack.Screen name="transfer" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
