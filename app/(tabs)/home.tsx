import Button from "@/components/Button";
import StarIcon from "@/components/Icons/StarIcon";
import CouponInput from "@/features/Home/CouponInput";
import CurrencyInput from "@/features/Home/CurrencyInput";
import ReloadButton from "@/features/Home/ReloadButton";
import Tab from "@/features/Home/Tab";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-10">
      <View className="flex-col gap-4 p-6">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 126,
            height: 31,
            alignSelf: "center",
            objectFit: "contain",
            marginBottom: 18,
          }}
        />

        <View className="flex-col gap-4">
          <View>
            <View className="flex-row items-center justify-between border border-b-gray-30 border-t-transparent border-x-transparent">
              <Tab title={`Compra: 3.321`} variant="active" />
              <Tab title={`Venta: 3.321`} variant="inactive" />
            </View>
            <View className="flex-col gap-3 px-4 pt-8 pb-2 bg-white rounded-b-lg">
              <View className="relative flex-col gap-3">
                <CurrencyInput
                  value={""}
                  onChange={() => {}}
                  currencyLabel="Dólares"
                  type="in"
                />
                <ReloadButton />
                <CurrencyInput
                  value={""}
                  onChange={() => {}}
                  currencyLabel="Soles"
                  type="out"
                />
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-col gap-1">
                  <Text className="text-sm font-montserrat-medium text-primary-dark">
                    Ahorro estimado
                  </Text>
                  <Text className="text-sm font-montserrat-semibold text-primary-dark">
                    S/ 555.00
                  </Text>
                </View>
                <View className="flex-col gap-1">
                  <Text className="text-sm font-montserrat-medium text-primary-dark">
                    Koins
                  </Text>
                  <Text className="text-sm font-montserrat-semibold text-primary-dark">
                    10,000
                  </Text>
                </View>
              </View>
              <View className="flex-col gap-4 mt-5">
                <CouponInput />
                <View className="flex-row items-center justify-center gap-2 px-4 py-2">
                  <StarIcon size={27} />
                  <View>
                    <Text className="text-sm text-center font-montserrat-regular text-primary-dark">
                      ¿Monto mayor a $5.000 o S/18.000?
                    </Text>
                    <Text className="text-xs text-center underline font-montserrat-bold text-primary-dark">
                      ¡Obtén un Tipo de Cambio Preferencia!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Button
            size="lg"
            onPress={() => router.push("/(operations)/transactions")}
          >
            INICIAR OPERACIÓN
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
