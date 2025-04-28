import Button from "@/components/Button";
import TopBar from "@/components/TopBar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const WelcomeScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <View className="h-full pb-10 bg-white">
      <TopBar title="Perfil creado con éxito" />
      <View className="flex-col justify-center flex-1 gap-16 p-6">
        <View className="flex-col gap-7">
          <Image
            source={require("@/assets/images/cellphone.png")}
            className="object-contain h-48 mx-auto mb-5 w-36"
          />
          <Text className="text-2xl text-center font-montserrat-bold text-primary-dark">
            ¡Felicitaciones {user?.name}, tu perfil ha sido creado!
          </Text>
          <Text className="text-base text-center font-montserrat-regular text-gray-60">
            Ya puedes empezar a{" "}
            <Text className="font-montserrat-italic">Kambiar</Text> con{"\n"} la
            mejor tasa del mercado
          </Text>
        </View>
        <Button size="lg" onPress={() => router.push("/home")}>
          CONTINUAR
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;
