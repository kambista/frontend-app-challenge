import { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useCustomInputAuth } from '../../hooks/useCustomInputAuth';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useSubmit } from '../../hooks/useSubmit';
import { CustomInputAuth } from '../ui/CustomInputAuth';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomButton } from '../ui/CustomButton';
import { EyeIcon, EyeOffIcon } from '../ui/EyeIcons';
import { SvgUri } from 'react-native-svg';

const logoAsset = require('../../assets/svg/logo_kambista.svg');
const { uri: logoUri } = Image.resolveAssetSource(logoAsset);

export const LoginForm = () => {
  const emailInput = useCustomInputAuth('email');
  const passInput = useCustomInputAuth('password');
  const checkbox = useCheckbox();
  const submit = useSubmit();
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View className="items-center mb-6">
        <SvgUri width={204} height={48} uri={logoUri} />
        <Text className="mt-10 mb-12 text-xl font-bold text-black">
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
            className="text-gray-60 underline"
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
        <Text style={styles.registerText} className="text-gray-60">
          ¿No tienes cuenta?
        </Text>
        <TouchableOpacity>
          <Text style={styles.registerText} className="text-gray-60 underline">
            Regístrate aquí
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  passwordRecoveryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
