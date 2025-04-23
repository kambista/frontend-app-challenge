import { View, Text, ScrollView, SafeAreaView } from 'react-native';

export const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-6">
          <Text className="text-2xl font-bold mb-4">Bienvenido a Kambista</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
