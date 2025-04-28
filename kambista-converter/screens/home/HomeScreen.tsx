import { StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Platform, UIManager } from 'react-native';
import { ExchangeCalculator } from '../../components/ui/ExchangeCalculator';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ExchangeCalculator />
      </View>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center',
    marginInline: 12,
  },
});
