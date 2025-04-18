import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';

import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logger } from '@/utils/logger';
import Images from '@/constants/Images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';
import useAuth from '@/hooks/useAuth';

const LoginSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true);
  const { login } = useAuth();

  const handleSubmit = (values: { email: string; password: string }) => {
    try {
      const success = login(values);
      if (success) {
        Logger.log('Inicio de sesión satisfactorio.');
        navigateToHome();
      } else {
        Logger.log('Credenciales inválidas');
      }
    } catch (error: any) {
      Logger.error(error);
    }
  };

  const formik = useFormik({
    initialValues: { email: 'edu@gmail.com', password: '12345678' },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  const navigateToHome = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView>
          <View className="w-full justify-center h-full px-6 my-6">
            <View className="my-2" />

            <View className="justify-center items-center">
              <Image source={Images.Logo} className="w-64" resizeMode="contain" />
            </View>

            <Text className="text-2xl text-center font-mbold">Inicia sesión</Text>

            <View className="my-10" />

            {/* Formulario con Formik */}
            <View className="w-full max-w-md">
              {/* Campo: Email */}
              <View className="mb-4">
                <Text className="font-mmedium text-gray-700 mb-2">Correo electrónico</Text>
                <TextInput
                  placeholder="ejemplo@correo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formik.values.email}
                  className={`font-mmedium border border-gray-300 rounded-lg py-4 pl-5 ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.email}</Text>}
              </View>

              {/* Campo: Contraseña */}
              <View className="mb-6">
                <Text className="font-mmedium text-gray-700 mb-2">Contraseña</Text>
                <View
                  className={`border rounded-lg py-1 px-4 flex-row items-center ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <TextInput
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    className="flex-1 font-mmedium"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                {formik.touched.password && formik.errors.password && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.password}</Text>
                )}
              </View>
            </View>

            <View className="flex flex-row justify-between w-full">
              <View className="flex">
                <Text className="text-md text-gray-600 font-mmedium">Recordarme</Text>
              </View>
              <Link href="/sign-up" className="text-md text-gray-600 font-mmedium underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </View>

            <View className="my-8" />
            <TouchableOpacity onPress={formik.submitForm} className="w-full py-5 rounded-xl bg-primary">
              <Text className="text-center text-lg font-msemibold">INICIA SESIÓN</Text>
            </TouchableOpacity>

            <View className="flex justify-center pt-6 flex-row gap-2">
              <Text className="text-md text-gray-600 font-mmedium">¿No tienes una cuenta?</Text>
              <Link href="/sign-up" className="text-md font-mmedium underline">
                Regístrate aquí
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
