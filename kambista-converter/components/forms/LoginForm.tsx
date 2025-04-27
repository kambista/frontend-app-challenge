import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useCustomInputAuth } from '../../hooks/useCustomInputAuth';
import { Link, useRouter } from 'expo-router';
import { useCheckbox } from '../../hooks/useCheckbox';
import { CustomInputAuth } from '../ui/CustomInputAuth';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomButton } from '../ui/CustomButton';
import { EyeIcon, EyeOffIcon } from '../icons/EyeIcons';
import { LogoKambista } from '../icons/LogoKambista';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api/client';

export const LoginForm = () => {
  const emailInput = useCustomInputAuth('email');
  const passInput = useCustomInputAuth('password');
  const checkbox = useCheckbox();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadSavedEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('savedEmail');
        if (email) {
          emailInput.onChangeText(email);
          setSavedEmail(email);
          if (!checkbox.checked) {
            checkbox.onPress();
          }
        }
      } catch (error) {
        console.error('Error cargando email guardado:', error);
      }
    };

    loadSavedEmail();
  }, []);

  const handleLogin = async () => {
    if (!emailInput.value || !passInput.value) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: emailInput.value,
        password: passInput.value,
        rememberMe: checkbox.checked,
      });

      if (response.data.success) {
        const { token, userId } = response.data.data;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', userId);

        if (checkbox.checked) {
          await AsyncStorage.setItem('savedEmail', emailInput.value);
        } else {
          await AsyncStorage.removeItem('savedEmail');
        }
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error de inicio de sesión', response.data.data.message);
      }
    } catch (error) {
      console.error('Error de login:', error);
      Alert.alert(
        'Error de conexión',
        'No pudimos conectar con el servidor. Por favor intenta de nuevo más tarde.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View className="items-center mb-6">
        <LogoKambista width={204} height={48} />
        <Text
          style={styles.loginHeaderText}
          className="mt-10 mb-12 text-black font-montserrat-bold"
        >
          Inicia sesión
        </Text>
      </View>

      <View className="w-full">
        <CustomInputAuth
          {...emailInput}
          label="Correo electrónico"
          placeholder="Correo electrónico"
        />
        <CustomInputAuth
          {...passInput}
          label="Contraseña"
          placeholder="Contraseña"
          secureTextEntry={!show}
          rightIcon={
            show ? (
              <EyeOffIcon color="#060f26" width={24} height={24} />
            ) : (
              <EyeIcon color="#060f26" width={24} height={24} />
            )
          }
          onIconPress={() => setShow((s) => !s)}
        />
      </View>

      <View className="w-full flex-row justify-between items-center mb-20">
        <CustomCheckbox label="Recordarme" {...checkbox} />
        <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
          <Text
            className="text-gray-60 underline font-montserrat-medium"
            style={styles.passwordRecoveryText}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-6">
        <CustomButton
          label={loading ? 'INICIANDO SESIÓN...' : 'INICIA SESIÓN'}
          onPressFunction={handleLogin}
        />
      </View>

      <View className="flex-row justify-center items-center gap-1">
        <Text
          style={styles.registerText}
          className="text-gray-60 font-montserrat-medium"
        >
          ¿No tienes cuenta?
        </Text>
        <Link asChild href="/Onboarding">
          <TouchableOpacity>
            <Text
              style={styles.registerText}
              className="text-gray-60 underline font-montserrat-medium"
            >
              Regístrate aquí
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  passwordRecoveryText: {
    fontSize: 12,
  },
  registerText: {
    fontSize: 14,
  },
  loginHeaderText: {
    fontSize: 20,
  },
});
