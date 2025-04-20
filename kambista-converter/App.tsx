import React from 'react';
import { LoginScreen } from './screens/auth/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenContainer } from './components/layout/ScreenContainer';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenContainer>
        <LoginScreen />
      </ScreenContainer>
    </SafeAreaProvider>
  );
}
