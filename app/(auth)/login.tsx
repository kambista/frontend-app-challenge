import LoginForm from "@/modules/auth/components/LoginForm";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="h-full bg-white"
      contentContainerClassName="my-auto p-6"
    >
      <View className="mb-16">
        <Image
          source={require("@/assets/images/logo.png")}
          className="object-contain h-12 mx-auto mb-4 w-52"
        />
        <Text className="pt-5 text-xl text-center font-montserrat-bold">
          Inicia Sesión
        </Text>
      </View>
      <LoginForm router={router} />
    </ScrollView>
  );
}
