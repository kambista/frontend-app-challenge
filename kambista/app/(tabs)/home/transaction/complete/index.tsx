import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/Stepper';
import { TransactionStepper } from '@/constants/Steppers';
import { Octicons } from '@expo/vector-icons';
const History = () => {
  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 pt-6">
        <Header title="Completa los datos" />
        <View className="my-2" />

        <View className="w-[85%] self-center">
          <Stepper steps={TransactionStepper} />
        </View>

        <View className="my-3" />

        <View className="bg-white rounded-xl flex flex-column px-8 py-4">
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Tú envías</Text>
            <Text className="font-mbold text-black">S/. 100.00</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Tú recibes</Text>
            <Text className="font-mbold text-black">S/. 343.00</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Cupón aplicado</Text>
            <Text className="font-mbold text-black">-</Text>
          </View>

          <View className="flex-1 h-px bg-gray-300 my-2" />

          <View className="flex flex-row justify-between">
            <Text className="font-mbold text-gray-800">Tipo de cambio utilizado</Text>
            <Text className="font-mbold text-black">3.433</Text>
          </View>
        </View>

        <View className="my-2" />

        <View className="bg-blue-100 rounded-xl flex flex-column px-8 py-4">
          <Text className="font-mlight text-black">
            Tiempo estimado de espera BCP, Interbank, BanBif, Pichincha: 15 minutos. Otros bancos: 1 día hábil.
          </Text>
        </View>

        <View className="my-2" />

        <Text className="font-mmedium text-black mb-2">¿Desde qué banco nos envias tu dinero?</Text>
        <TouchableOpacity className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 border-gray-300 bg-white flex flex-row justify-between">
          <Text className="font-mlight text-mmedium">Selecciona</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-4" />

        <Text className="font-mmedium text-black mb-2">¿En qué cuenta deseas recibir tu dinero?</Text>
        <TouchableOpacity className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 border-gray-300 bg-white flex flex-row justify-between">
          <Text className="font-mlight text-mmedium">Selecciona</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-2" />
        <View className="bg-orange-100 rounded-xl flex flex-column px-8 py-4">
          <Text className="font-mlight text-black">
            Recuerda que las cuentas deben estar a tu nombre. Kambista no transfiere a cuentas de terceros.
          </Text>
        </View>

        <View className="my-4" />

        <Text className="font-mmedium text-black mb-2">Origen de fondos</Text>
        <TouchableOpacity className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 border-gray-300 bg-white flex flex-row justify-between">
          <Text className="font-mlight text-mmedium">Selecciona</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-4" />

        <TouchableOpacity onPress={() => {}} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">CONTINUAR</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
