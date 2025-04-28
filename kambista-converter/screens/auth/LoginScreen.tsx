import { View, StyleSheet } from 'react-native';
import { LoginForm } from '../../components/forms/LoginForm';
import { ScreenContainer } from '../../components/layout/ScreenContainer';

export const LoginScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <LoginForm />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginInline: 24,
  },
});
