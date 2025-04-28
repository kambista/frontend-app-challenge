import Button from "@/components/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { log } from "@/utils/logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  const handleClearStorage = () => {
    AsyncStorage.clear()
      .then(() => {
        log.info("Storage cleared successfully.");
      })
      .catch((error) => {
        log.error("Error clearing storage:", error);
      });
  };

  return (
    <View className="flex-col gap-4 p-6">
      <Text className="text-2xl font-montserrat-bold text-primary-dark">
        {user?.name}
      </Text>
      <Button variant="filled-primary" onPress={handleClearStorage}>
        Limpiar storage
      </Button>
      <Button variant="filled-primary" onPress={handleLogout}>
        Cerrar sesión
      </Button>
    </View>
  );
}
