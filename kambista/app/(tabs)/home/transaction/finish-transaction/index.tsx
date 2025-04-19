import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { TransactionStepper } from '@/constants/Steppers';
import Stepper from '@/components/Stepper';
import Header from '@/components/Header';
import Images from '@/constants/Images';
import useTransaction from '@/hooks/useTransaction';
import CardContainer from '@/components/CardContainer';

const History = () => {
  const { calculatorRequest, calculatorResponse, resetTransaction } = useTransaction();

  const navigateToHome = () => {
    resetTransaction();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="my-6" />

        <CardContainer>
          <View className="justify-center items-center my-8">
            <Image source={Images.Pig} className="w-48" resizeMode="contain" />
          </View>

          <Text className="font-mbold text-2xl self-center">¡Constancia enviada!</Text>

          <View className="flex-1 h-px bg-gray-300 my-2" />

          <Text className="font-mmedium text-gray-800">Código Kambista</Text>
          <Text className="font-mbold text-lg mb-2">kmf20ttff</Text>

          <Text className="font-mmedium text-sm text-gray-800 mb-2">*Usa tu código para dar seguimiento a la operación</Text>

          <Text className="font-mmedium text-sm text-gray-800">Monto a recibir</Text>
          <Text className="font-mbold text-lg mb-2">
            {calculatorRequest?.destinationCurrency} {calculatorResponse?.exchange}
          </Text>

          <Text className="font-mmedium text-sm text-gray-800">Tiempo estimado de espera</Text>
          <Text className="font-mbold text-lg mb-2">20h 15m</Text>
          <View className="my-2" />
        </CardContainer>

        <TouchableOpacity className="justify-center items-center w-full my-4">
          <Image source={Images.BannerDiscount} className="w-full rounded-xl" />
        </TouchableOpacity>

        <Text className="font-mregular self-center text-center">Verificaremos tu operación. Puedes ver su estado en "Mis Operaciones"</Text>
        <View className="my-4" />

        <TouchableOpacity onPress={navigateToHome} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">VOLVER A INICIO</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
