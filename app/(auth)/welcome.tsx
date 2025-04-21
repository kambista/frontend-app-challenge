import Button from "@/components/Button";
import TopBar from "@/components/TopBar";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 pb-10 bg-white">
      <TopBar title="Perfil creado con éxito" />
      <View className="flex-col justify-center flex-1 gap-16 p-6">
        <View className="flex-col gap-7">
          <Image
            source={require("@/assets/images/cellphone.png")}
            style={{
              width: 126,
              height: 187,
              alignSelf: "center",
              objectFit: "contain",
              marginBottom: 18,
            }}
          />
          <Text className="text-2xl text-center font-montserrat-bold text-primary-dark">
            ¡Felicitaciones Ejemplo,{"\n"} tu perfil ha sido creado!
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
