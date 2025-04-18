import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { TransactionStepper } from '@/constants/Steppers';
import Stepper from '@/components/Stepper';
import Header from '@/components/Header';
import Images from '@/constants/Images';

const History = () => {
  const navigateToFinishTransaction = () => {
    router.push('/(tabs)/home/transaction/finish-transaction');
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <Header title="Completa los datos" />
        <View className="my-2" />

        <View className="w-[85%] self-center">
          <Stepper steps={TransactionStepper} activeStep={2} />
        </View>

        <View className="my-4" />

        <View className="bg-white rounded-xl flex flex-column px-8 py-4">
          <View className="justify-center items-center">
            <Image source={Images.Logo} className="w-48" resizeMode="contain" />
          </View>

          <Text className="font-mregular text-lg text-gray-800">Adjunta tu constancia de tu transferencia para poder verificar tu operación.</Text>

          <View className="border border-gray-300 rounded-lg py-4 px-5">
            <Text className="font-mmedium text-md text-black">Sube el archivo de tu constancia</Text>
            <Text className="font-mmedium text-md text-black">*Tamaño máximo permitido del archivo 10 Mb</Text>
          </View>

          <Text className="font-mregular text-gray-800">Recuerda:</Text>
          
          <Text className="font-mregular text-gray-800">El voucher enviado debe tener el monto, datos del beneficiario, fecha y hora.</Text>
          <Text className="font-mregular text-gray-800">El voucher debe ser legible.</Text>
          <Text className="font-mregular text-gray-800">Archivos permitidos imágenes, word y PDF</Text>

          <View className="my-2" />
        </View>

        <View className="my-4" />

        <TouchableOpacity onPress={navigateToFinishTransaction} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">ENVIAR CONSTANCIA</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
