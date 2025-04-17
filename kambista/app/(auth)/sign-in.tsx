import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '@/hooks/useAuth';
import { Logger } from '@/utils/logger';

const SignIn = () => {
  const { login, loading } = useAuth();
  // const { initSession } = useMain();

  const initialValues = {
    email: 'edurz12345@gmail.com',
    password: '12345678',
  };

  const navigateToHome = () => {
    router.replace('/home');
  };

  const handleSubmit = async (data: any) => {
    try {
      const success = await login(data);
      if (success) {
        // await initSession();
        navigateToHome();
      } else {
        // ShowError('Usuario o contraseña incorrecta.');
      }
    } catch (error: any) {
      Logger.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] h-full px-4 my-6">
          <Text className="text-3xl text-center font-qbold">
            Ubiquitous<Text className="text-primary">Book</Text>
          </Text>

          <Text className="text-base text-gray-800 text-center mt-5 font-qmedium">Inicia Sesión</Text>

          <View className="my-3" />

          {/* <DynamicForm fields={loginFormFields} onSubmit={handleSubmit} submitText="Iniciar Sesión" initialValues={initialValues} /> */}
          <TouchableOpacity onPress={navigateToHome} className="w-full py-5 rounded-full bg-black">
            <Text className="text-center text-white text-lg font-qregular">Ir a Home</Text>
          </TouchableOpacity>
          
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-md text-gray-500 font-qmedium">No tienes una cuenta?</Text>
            <Link href="/sign-up" className="text-md font-qsemibold text-aloha-500">
              Registrarse
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
