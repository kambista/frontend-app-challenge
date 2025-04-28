import { StyleSheet, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  backgroundColor?: string; // ✅ Ahora puedes pasar un backgroundColor
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  backgroundColor = '#ffffff', // ✅ Blanco por defecto
}) => {
  const insets = useSafeAreaInsets();
  const Container = scrollable ? ScrollView : View;

  return (
    <Container
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor, // ✅ Aquí aplicamos el background dinámico
        },
      ]}
    >
      <StatusBar style="auto" />
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
