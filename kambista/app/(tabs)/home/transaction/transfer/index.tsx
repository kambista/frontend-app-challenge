import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/Stepper';
import { TransactionStepper } from '@/constants/Steppers';
import { router } from 'expo-router';
import Images from '@/constants/Images';
import useTransaction from '@/hooks/useTransaction';

const History = () => {
  const { calculatorRequest } = useTransaction();

  const navigateToConstancy = () => {
    router.push('/(tabs)/home/transaction/constancy');
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <Header title="Completa los datos" />
        <View className="my-2" />

        <View className="w-[85%] self-center">
          <Stepper steps={TransactionStepper} activeStep={1} />
        </View>

        <View className="my-3" />

        <View className="flex flex-row justify-between items-center">
          <Text className="font-mmedium text-sm text-gray-800">El tipo de cambio podría actualizarse a las:</Text>
          <Text className="font-msemibold text-xl text-gray-800">13:15</Text>
        </View>

        <View className="bg-white rounded-xl flex flex-column px-8 py-4">
          <View className="justify-center items-center">
            <Image source={Images.Logo} className="w-48" resizeMode="contain" />
          </View>

          <Text className="font-mregular text-lg text-gray-800">
            Transfiere desde tu app bancaria y guarda el número o código de operación para el siguiente paso.
          </Text>

          <View className="my-2" />

          <View className="border border-gray-300 rounded-lg py-4 px-5">
            <Text className="font-mmedium text-sm text-gray-800">Banco</Text>
            <Text className="font-mbold text-black mb-2">Interbank</Text>

            <Text className="font-mmedium text-sm text-gray-800">Monto</Text>
            <Text className="font-mbold text-black mb-2">
              {calculatorRequest?.originCurrency} {calculatorRequest?.amount}
            </Text>

            <Text className="font-mmedium text-sm text-gray-800">Número de cuenta</Text>
            <Text className="font-mbold text-black mb-2">201010000000000</Text>

            <Text className="font-mmedium text-sm text-gray-800">RUC</Text>
            <Text className="font-mbold text-black mb-2">20601708141</Text>

            <Text className="font-mmedium text-sm text-gray-800">Titular de la cuenta</Text>
            <Text className="font-mbold text-black mb-2">Kambista SAC</Text>

            <Text className="font-mmedium text-sm text-gray-800">Tipo de cuenta</Text>
            <Text className="font-mbold text-black">Corriente</Text>
          </View>
          <View className="my-2" />
        </View>

        <View className="my-4" />

        <TouchableOpacity onPress={navigateToConstancy} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">YA HICE MI TRANSFERENCIA</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
