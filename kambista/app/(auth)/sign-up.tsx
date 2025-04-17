import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accounts = () => {

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] h-full px-4 my-6">
        <Text className="text-3xl text-center font-qbold">
            Ubiquitous<Text className="text-primary">Book</Text>
          </Text>

          <Text className="text-base text-gray-800 text-center mt-5 font-qmedium">Registrarse</Text>
          
          <View className="my-3" />


          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-md text-black font-qmedium">Ya tienes una cuenta?</Text>
            <Link href="/sign-in" className="text-md font-qsemibold text-black">
              Iniciar Sesión
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;
