import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView } from 'react-native';
import React from 'react';

const Koinks = () => {
  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="my-4" />
        <Text className="font-mmedium text-xl">Koinks</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Koinks;
