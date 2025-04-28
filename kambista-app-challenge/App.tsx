import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_400Regular_Italic } from '@expo-google-fonts/montserrat';
import { StyleSheet } from 'react-native';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { BuildNavigation } from './src/navigation/BuildNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BuildNavigation />
      </NavigationContainer> 
    </GestureHandlerRootView>     
  );
}
