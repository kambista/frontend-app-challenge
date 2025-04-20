import { View, StyleSheet } from 'react-native';
import { LoginForm } from '../../components/forms/LoginForm';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
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
