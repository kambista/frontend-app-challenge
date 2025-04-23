import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { Image } from 'react-native';
import Images from '@/constants/Images';
import { router } from 'expo-router';

const SignUpFinish = () => {
  const navigateToHome = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-6 my-6">
        <Header title="Perfil creado con éxito" showBackButton={false}/>
        <View className="my-12" />
        <View className="flex items-center">
          <Image source={Images.Phone} />
        </View>
        <View className="my-4" />
        <Text className="font-mextrabold text-2xl self-center">¡Felicitaciones Ejemplo,{'\n'}tu perfil ha sido creado!</Text>
        <View className="my-4" />
        <Text className="font-mregular text-base text-gray self-center">Ya puedes empezar a Kambiar con</Text>
        <Text className="font-mregular text-base text-gray self-center">la mejor tasa del mercado</Text>

        <View className="my-8" />
        <TouchableOpacity onPress={navigateToHome} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">CONTINUAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpFinish;
