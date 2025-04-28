import { View, Text, Image } from "react-native";
import React from "react";
import Button from "@/components/Button";
import CompanyInfo from "..";
import { useExchangeStore } from "@/stores/useExchangeStore";

interface TransferStepProps {
  onContinue: () => void;
}

const TransferStep = ({ onContinue }: TransferStepProps) => {
  const { exchangeData } = useExchangeStore();

  return (
    <View className="flex-col gap-6 px-6 pb-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-montserrat-medium text-gray-60">
          El tipo de cambio podría actualizarse a las:
        </Text>
        <Text className="text-lg font-montserrat-semibold text-gray-60">
          13:15
        </Text>
      </View>
      <View className="flex-col items-center gap-3 p-5 bg-white border rounded-lg border-gray-23">
        <Image
          source={require("@/assets/images/wallet.png")}
          className="w-20 h-20"
        />
        <Text className="text-base font-montserrat-light text-primary-dark">
          Transfiere desde tu app bancaria y guarda el{" "}
          <Text className="underline font-montserrat-medium text-primary-dark">
            número o código de operación
          </Text>{" "}
          para el siguiente paso.
        </Text>
        <CompanyInfo
          amountIn={{
            currencySymbol:
              exchangeData?.amountIn?.currency === "PEN" ? "S/" : "$",
            amount: exchangeData?.amountIn?.amount ?? 0
          }}
        />
      </View>
      <Button size="lg" onPress={onContinue}>
        YA HICE MI TRANSFERENCIA
      </Button>
    </View>
  );
};

export default TransferStep;
