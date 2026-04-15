import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/auth/authStore";

function firstNameFromNombresCompletos(nombresCompletos: string): string {
  const first = nombresCompletos.trim().split(/\s+/)[0];
  return first ?? "";
}

export default function ProfileSuccessScreen() {
  const nombresCompletos = useAuthStore((s) => s.user?.nombresCompletos ?? "");
  const setPostRegisterSuccessPending = useAuthStore(
    (s) => s.setPostRegisterSuccessPending,
  );
  const displayName = firstNameFromNombresCompletos(nombresCompletos);
  const headline = `¡Felicitaciones${displayName ? ` ${displayName}` : ""}, tu perfil ha sido creado!`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 32,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-8 text-center text-sm font-bold text-kambista-navy">
          Perfil creado con éxito
        </Text>

        <View className="mb-10 items-center justify-center px-4">
          <Image
            source={require("../../../assets/phone.png")}
            style={{ width: 220, height: 280 }}
            resizeMode="contain"
          />
        </View>

        <Text className="mb-4 px-2 text-center text-xl font-bold leading-7 text-kambista-navy">
          {headline}
        </Text>

        <Text className="mb-12 px-2 text-center text-base leading-6 text-kambista-muted">
          Ya puedes empezar a{" "}
          <Text style={{ fontStyle: "italic" }}>Kambiar</Text> con la mejor
          tasa del mercado
        </Text>

        <Pressable
          className="mt-auto w-full items-center rounded-xl bg-kambista-cyan py-4 active:opacity-90"
          onPress={() => setPostRegisterSuccessPending(false)}
        >
          <Text className="text-base font-bold uppercase tracking-widest text-kambista-navy">
            CONTINUAR
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
