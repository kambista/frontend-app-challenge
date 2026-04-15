import { Image, Platform, Text, View } from "react-native";
import Button from "../Button";
import { CARD_ELEVATION_STYLE } from "../../constants/colors";
import { useExchangeStore } from "../../stores/exchange/exchangeStore";

const PLACEHOLDER_KAM_CODE = "km20ttfff";
const PLACEHOLDER_ETA = "20h 15min";

const FIGMA_DISFRUTA = ["#B28FD9", "#F0979E", "#FCC48C"] as const;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function mixHex(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  const r = mix(A.r, B.r);
  const g = mix(A.g, B.g);
  const bl = mix(A.b, B.b);
  return `#${[r, g, bl].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function disfrutaGradientAt(t: number): string {
  if (t <= 0.5) return mixHex(FIGMA_DISFRUTA[0], FIGMA_DISFRUTA[1], t * 2);
  return mixHex(FIGMA_DISFRUTA[1], FIGMA_DISFRUTA[2], (t - 0.5) * 2);
}

const DISFRUTA_GRADIENT_STRIPES = 56;
const DISFRUTA_STRIPE_COLORS = Array.from({ length: DISFRUTA_GRADIENT_STRIPES }, (_, i) =>
  disfrutaGradientAt(DISFRUTA_GRADIENT_STRIPES <= 1 ? 0 : i / (DISFRUTA_GRADIENT_STRIPES - 1)),
);

type ConstanciaEnviadaStepProps = {
  onVolverInicio: () => void;
};

export default function ConstanciaEnviadaStep({ onVolverInicio }: ConstanciaEnviadaStepProps) {
  const { receiveAmount, tab } = useExchangeStore((s) => s);

  const montoRecibirLabel =
    tab === "compra" ? `S/ ${receiveAmount}` : `$ ${receiveAmount}`;

  return (
    <View className="pb-6 pt-16">
      <View className="mb-4 rounded-2xl bg-white p-5" style={CARD_ELEVATION_STYLE}>
        <View className="mb-4 items-center">
          <View className="h-[120px] w-full items-center justify-center">
            <Image
              source={require("../../../assets/logo_constancia_enviada.png")}
              className="h-full w-full max-h-[100px]"
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Constancia enviada"
            />
          </View>
        </View>
        <Text className="mb-4 text-center text-lg font-bold text-kambista-navy">
          ¡Constancia enviada!
        </Text>

        <Text className="mb-1 text-center text-xs text-kambista-muted">Código Kambista</Text>
        <Text className="mb-2 text-center text-xl font-bold text-kambista-navy">
          {PLACEHOLDER_KAM_CODE}
        </Text>
        <Text className="mb-6 text-center text-xs leading-5 text-kambista-muted">
          *Usa tu código para dar seguimiento a tu operación.
        </Text>

        <View className="mb-4 flex-row justify-between border-t border-kambista-border pt-4">
          <Text className="text-sm text-kambista-muted">Monto a recibir</Text>
          <Text className="text-base font-bold text-kambista-navy">{montoRecibirLabel}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-kambista-muted">Tiempo estimado de espera</Text>
          <Text className="text-base font-bold text-kambista-navy">{PLACEHOLDER_ETA}</Text>
        </View>
      </View>

      <View className="relative mb-4 overflow-hidden rounded-2xl">
        <View
          className="absolute bottom-0 left-0 right-0 top-0 flex-row"
          pointerEvents="none"
        >
          {DISFRUTA_STRIPE_COLORS.map((color, i) => (
            <View key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </View>
        <Image
          source={require("../../../assets/pig.png")}
          className="absolute -bottom-1 left-0 z-[1] h-[76px] w-[76px]"
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
        <View className="z-[2] items-center px-3 py-5">
          <Text className="mb-0.5 text-center text-sm font-bold leading-5 text-kambista-navy">
            Disfruta de{" "}
            <Text
              className="rounded-full bg-[#F1C40F] px-2 py-0.5 text-kambista-navy"
              style={
                Platform.OS === "ios"
                  ? {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.18,
                      shadowRadius: 2,
                    }
                  : { elevation: 3 }
              }
            >
              descuentos
            </Text>{" "}
            en los mejores
          </Text>
          <Text className="text-center text-sm font-bold leading-5 text-white">comercios</Text>
        </View>
      </View>

      <Text className="mb-6 px-1 text-center text-xs leading-5 text-kambista-muted">
        Verificaremos tu operación. Puedes ver su estado en{" "}
        <Text className="font-semibold text-kambista-navy">Mis operaciones</Text>.
      </Text>

      <View className="w-full">
        <Button variant="fill" tone="cyan" onPress={onVolverInicio} className="rounded-2xl py-4">
          VOLVER A INICIO
        </Button>
      </View>
    </View>
  );
}
