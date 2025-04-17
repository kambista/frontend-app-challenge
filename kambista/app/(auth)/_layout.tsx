import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <>
      <Stack initialRouteName="sign-in">
        <Stack.Screen name="sign-in" options={{ headerShown: false }}/>
        <Stack.Screen name="sign-up" options={{ headerShown: false }}/>
      </Stack>
    </>
  )
}