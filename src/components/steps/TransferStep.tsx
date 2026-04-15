import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import {
  CARD_ELEVATION_STYLE,
  PLACEHOLDER_GRAY,
} from "../../constants/colors";
import { useExchangeStore } from "../../stores/exchange/exchangeStore";

type TransferStepProps = {
  onContinue: () => void;
};

const INITIAL_RATE_COUNTDOWN_SEC = 13 * 60 + 15;

export default function TransferStep({ onContinue }: TransferStepProps) {
  const [rateCountdownSec, setRateCountdownSec] = useState(INITIAL_RATE_COUNTDOWN_SEC);
  const { sendAmount, receiveAmount, tab } = useExchangeStore((s) => s);

  useEffect(() => {
    const id = setInterval(() => {
      setRateCountdownSec((prev) => (prev <= 0 ? 0 : prev - 1));

      if(rateCountdownSec === 0) {
        console.log('call endpoint exchange');
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const clampedSec = Math.max(0, rateCountdownSec);
  const rateCountdownLabel = `${String(Math.floor(clampedSec / 60)).padStart(2, "0")}:${String(clampedSec % 60).padStart(2, "0")}`;

  return (
    <View>
      <View className="mb-4">
        <Text className="text-center text-sm text-kambista-muted">
          El tipo de cambio podría actualizarse en:{" "}
          <Text className="text-lg font-bold text-kambista-navy">{rateCountdownLabel}</Text>
        </Text>
      </View>

      <View className="mb-6 rounded-2xl bg-white p-5" style={CARD_ELEVATION_STYLE}>
        <View className="items-center justify-center">
          <View className="relative h-[140px] w-full items-center justify-center">
            <Image
              source={require("../../../assets/logo_step_transfiere.png")}
              className="h-full w-full max-h-[80px]"
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Transferencia a Kambista"
            />
          </View>
        </View>

        <Text className="mb-5 px-1 text-center text-sm leading-5 text-kambista-navy">
          Transfiere desde tu app bancaria y guarda el{" "}
          <Text
            style={{
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            número o código de operación
          </Text>{" "}
          para el siguiente paso.
        </Text>

        <View className="rounded-xl border border-kambista-border bg-white p-4">
          <View className="mb-3">
            <Text className="mb-1 text-xs font-bold text-kambista-muted">Banco</Text>
            <Text className="text-base text-kambista-navy">Interbank</Text>
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-xs font-bold text-kambista-muted">Monto</Text>
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 pr-2 text-base text-kambista-navy">{tab === "compra" ? "$ " + sendAmount : "S/ " + sendAmount}</Text>
              <Icon name="copy-outline" size={20} color={PLACEHOLDER_GRAY} />
            </View>
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-xs font-bold text-kambista-muted">Número de cuenta</Text>
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 pr-2 text-base text-kambista-navy">201010000000000</Text>
              <Icon name="copy-outline" size={20} color={PLACEHOLDER_GRAY} />
            </View>
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-xs font-bold text-kambista-muted">RUC</Text>
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 pr-2 text-base text-kambista-navy">20601708141</Text>
              <Icon name="copy-outline" size={20} color={PLACEHOLDER_GRAY} />
            </View>
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-xs font-bold text-kambista-muted">Titular de la cuenta</Text>
            <Text className="text-base text-kambista-navy">Kambista SAC</Text>
          </View>
          <View>
            <Text className="mb-1 text-xs font-bold text-kambista-muted">Tipo de cuenta</Text>
            <Text className="text-base text-kambista-navy">Corriente</Text>
          </View>
        </View>
      </View>

      <View className="w-full">
        <Button
          variant="fill"
          tone="cyan"
          onPress={onContinue}
          className="rounded-2xl py-4"
        >
          YA HICE MI TRANSFERENCIA
        </Button>
      </View>
    </View>
  );
}
