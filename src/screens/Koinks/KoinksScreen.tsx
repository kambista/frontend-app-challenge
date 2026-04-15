import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KoinksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-lg font-semibold text-gray-800">Koinks</Text>
        <Text className="mt-2 text-center text-gray-500">Próximamente</Text>
      </View>
    </SafeAreaView>
  );
}
