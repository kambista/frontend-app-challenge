import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView } from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="flex items-center justify-center mt-14">
          {false ? (
            <Image
              className={`aspect-square bg-primary h-28 rounded-full`}
              source={{
                uri: undefined, // professional.foto,
              }}
            />
          ) : (
            <View className={`aspect-square bg-primary items-center justify-center h-28 rounded-full`}>
              <Text className="text-5xl text-[#434343] font-qregular">{'Facundo'.charAt(0)}</Text>
            </View>
          )}
          <View className="my-1" />

          <Text className="font-psemibold text-xl font-qsemibold text-gray-800">Facundo Ramón Z.</Text>
          <Text className="font-qmedium text-base text-gray-500">facundo@gmail.com</Text>
        </View>

        <View className="my-4" />

        <View className="my-12" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
