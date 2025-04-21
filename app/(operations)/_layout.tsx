import { Stack } from "expo-router";
import { View } from "react-native";

export default function OperationsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="transactions" />
        <Stack.Screen name="summary" />
      </Stack>
    </View>
  );
}
