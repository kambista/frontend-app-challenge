import { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useCustomInputAuth } from '../../hooks/useCustomInputAuth';
import { Link } from 'expo-router';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useSubmit } from '../../hooks/useSubmit';
import { CustomInputAuth } from '../ui/CustomInputAuth';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomButton } from '../ui/CustomButton';
import { EyeIcon, EyeOffIcon } from '../icons/EyeIcons';
import { LogoKambista } from '../icons/LogoKambista';

export const LoginForm = () => {
  const emailInput = useCustomInputAuth('email');
  const passInput = useCustomInputAuth('password');
  const checkbox = useCheckbox();
  const submit = useSubmit();
  const [show, setShow] = useState(false);

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
        <CustomInputAuth {...emailInput} placeholder="Correo electrónico" />
        <CustomInputAuth
          {...passInput}
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
        <TouchableOpacity>
          <Text
            className="text-gray-60 underline font-montserrat-medium"
            style={styles.passwordRecoveryText}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-6">
        <CustomButton label="INICIA SESIÓN" onPressFunction={submit} />
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
