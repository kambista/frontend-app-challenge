import Button from "@/components/Button";
import Divider from "@/components/Divider";
import ColumnInfo from "@/modules/transactions/components/ColumnInfo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useExchangeStore } from "@/stores/useExchangeStore";
import { formatCurrency } from "@/utils/helpers";

const SummaryScreen = () => {
  const router = useRouter();
  const { exchangeData } = useExchangeStore();

  return (
    <SafeAreaView className="flex-1 p-6 bg-gray-10">
      <View className="flex-col gap-3 mb-8">
        <View className="flex-col items-center w-full gap-3 p-6 bg-white border rounded-lg border-gray-23">
          <View className="flex-col items-center gap-8">
            <Image
              source={require("@/assets/images/success-pet.png")}
              className="w-28 h-28"
            />
            <Text className="text-xl text-center font-montserrat-bold">
              ¡Constancia enviada!
            </Text>
          </View>
          <View className="w-full">
            <Divider
              orientation="horizontal"
              thickness={1}
              className="bg-[#A7A7A7]"
            />
          </View>
          <View className="flex-col w-full gap-3">
            <ColumnInfo name="Código Kambista" value="km20ttfff" variant="md" />
            <Text className="text-sm font-montserrat-medium text-primary-dark">
              *Usa tu código para dar seguimiento a tu operación.
            </Text>
            <ColumnInfo
              name="Monto a recibir"
              value={formatCurrency(
                exchangeData?.amountOut?.amount ?? 0,
                exchangeData?.amountOut?.currency === "PEN" ? "S/" : "$"
              )}
              variant="md"
            />
            <ColumnInfo
              name="Tiempo estimado de espera"
              value="20h 15min"
              variant="md"
            />
          </View>
        </View>
        <LinearGradient
          colors={["#B28FD9", "#F0979E", "#FCC48C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View className="relative h-24 overflow-hidden rounded-lg">
            <Image
              source={require("@/assets/images/banner-pet.png")}
              className="absolute left-0 w-20 h-20 top-4"
            />
            <Image
              source={require("@/assets/images/gift.png")}
              className="absolute right-0 w-20 h-20 top-4"
            />
            <View>
              <View className="flex-row items-center justify-center w-full mt-3">
                <Text className="text-sm font-montserrat-bold">
                  Disfruta de{" "}
                </Text>
                <Text
                  className="text-sm font-montserrat-bold bg-[#EFC546] px-2 py-1 rounded-3xl shadow-coupon"
                  style={Platform.OS === "android" ? styles.textShadow : {}}
                >
                  descuentos
                </Text>
              </View>
              <View className="flex-col items-center justify-center w-full">
                <View className="flex-row items-center gap-1">
                  <Text className="text-sm text-center font-montserrat-bold">
                    en los{" "}
                  </Text>
                  <Text className="text-sm text-center text-white font-montserrat-bold">
                    mejores
                  </Text>
                </View>
                <Text className="text-sm text-center text-white font-montserrat-bold">
                  comercios
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <Text className="py-2 text-sm text-center font-montserrat-regular text-primary-dark">
          Verificaremos tu operación. Puedes ver su estado en “Mis operaciones”.
        </Text>
      </View>
      <Button size="lg" onPress={() => router.push("/(tabs)/home")}>
        VOLVER A INICIO
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    overflow: "hidden"
  },
  textShadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3
  }
});

export default SummaryScreen;
