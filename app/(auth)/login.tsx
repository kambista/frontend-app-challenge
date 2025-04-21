import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import CustomLink from "@/components/CustomLink";
import EyeOpenIcon from "@/components/Icons/EyeOpenIcon";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const handleOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <View className="flex-col justify-center h-full gap-16 p-6 bg-white ">
      <View className="flex-col gap-5">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 208,
            height: 48,
            alignSelf: "center",
            objectFit: "contain",
            marginBottom: 18,
          }}
        />
        <Text className="text-xl text-center font-montserrat-bold">
          Inicia Sesión
        </Text>
      </View>
      <View className="flex-col gap-5 ">
        <CustomInput
          label="Correo electrónico"
          placeholder="Escribe tu correo electrónico"
          value={""}
          onChangeText={() => {}}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomInput
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          value={""}
          onChangeText={() => {}}
          autoCapitalize="none"
          secureTextEntry
          rightElement={<EyeOpenIcon size={20} color="#060F26" />}
        />

        <View className="flex-row justify-between">
          <Checkbox
            label="Recordarme"
            checked={false}
            onChange={() => {}}
            size={20}
          />
          <CustomLink
            onPress={() =>
              router.push("https://app.kambista.com/recuperar-contrasena")
            }
          >
            ¿Olvidaste tu contraseña?
          </CustomLink>
        </View>

        <View className="flex-col gap-5 mt-20">
          <Button size="lg" onPress={handleOnboarding}>
            INICIA SESIÓN
          </Button>
          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-sm text-gray-60 font-montserrat-medium">
              ¿No tienes cuenta?
            </Text>
            <CustomLink
              textClassName="text-sm text-gray-60 font-montserrat-medium"
              onPress={() => {}}
            >
              Regístrate aquí
            </CustomLink>
          </View>
        </View>
      </View>
    </View>
  );
}
