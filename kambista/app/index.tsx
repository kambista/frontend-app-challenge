import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logger } from '@/utils/logger';
import Images from '@/constants/Images';

const App = () => {
  const navigateToSignIn = () => {
    router.push('/sign-in');
  };

  const navigateToSignUp = () => {
    router.push('/sign-up');
  };
  useEffect(() => {
    Logger.log(`🤑 Starting Kambista App.`);
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-screen px-4">
          <Image source={Images.kambista} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />

          <Text className="text-sm text-gray-800 font-medium mt-8 text-center font-qmedium">
            La aplicación #1 del Perú para reservar citas cuando quieras y con quien quieras.
          </Text>

          <View className="my-5"></View>

          <TouchableOpacity onPress={navigateToSignIn} className="w-full py-5 rounded-full bg-black">
            <Text className="text-center text-white text-lg font-qregular">Iniciar Sesión</Text>
          </TouchableOpacity>

          <View className="my-3" />
          
          <TouchableOpacity onPress={navigateToSignUp} className="w-full py-5 rounded-full bg-gray">
            <Text className="text-center text-black text-lg font-qregular">Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
