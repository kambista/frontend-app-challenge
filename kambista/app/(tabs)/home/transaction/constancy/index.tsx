import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { TransactionStepper } from '@/constants/Steppers';
import Stepper from '@/components/Stepper';
import Header from '@/components/Header';
import Images from '@/constants/Images';

const History = () => {
  const navigateToHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="my-6" />

        <View className="bg-white rounded-xl flex flex-column px-8 py-4">
          <View className="justify-center items-center">
            <Image source={Images.Logo} className="w-48" resizeMode="contain" />
          </View>

          <Text className="font-mbold text-2xl self-center">¡Constancia enviada!</Text>

          <View className="flex-1 h-px bg-gray-300 my-2" />

          <Text className="font-mmedium text-gray-800">Código Kambista</Text>
          <Text className="font-mbold text-lg mb-2">kmf20ttff</Text>

          <Text className="font-mmedium text-sm text-gray-800 mb-2">*Usa tu código para dar seguimiento a la operación</Text>

          <Text className="font-mmedium text-sm text-gray-800">Monto a recibir</Text>
          <Text className="font-mbold text-lg mb-2">S/. 343.00</Text>

          <Text className="font-mmedium text-sm text-gray-800">Tiempo estimado de espera</Text>
          <Text className="font-mbold text-lg mb-2">20h 15m</Text>
          <View className="my-2" />
        </View>

        <TouchableOpacity className="justify-center items-center">
          <Image source={Images.Logo} className="w-48" resizeMode="contain" />
        </TouchableOpacity>

        <Text className="font-mregular self-center">Verificaremos tu operación. Puedes ver su estado en "Mis Operaciones"</Text>
        <View className="my-4" />

        <TouchableOpacity onPress={navigateToHome} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">VOLVER A INICIO</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
