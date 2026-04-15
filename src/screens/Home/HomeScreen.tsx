import type { CompositeNavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import AppSafeArea from "../../components/AppSafeArea";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import {
  CARD_ELEVATION_STYLE,
  PLACEHOLDER_GRAY,
} from "../../constants/colors";
import type {
  AppStackParamList,
  BottomTabParamList,
} from "../../navigation/navigation.types";
import { getExchanges } from "../../services/exchanges/exchanges.service";
import { Exchange } from "../../services/exchanges/exchanges.types";
import type { ExchangeType } from "../../services/exchanges/exchanges.types";
import { useExchangeStore } from "../../stores/exchange/exchangeStore";

const MAP_TABS = {
  compra: { sendCurrency: "Dólares", receiveCurrency: "Soles" },
  venta: { sendCurrency: "Soles", receiveCurrency: "Dólares" },
} as const;

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Home">,
  NativeStackNavigationProp<AppStackParamList>
>;

function receiveFromSend(
  sendText: string,
  activeTab: ExchangeType,
  bid: number,
  ask: number,
): string {
  const cantidad = Number(sendText.trim());
  if (!Number.isFinite(cantidad) || cantidad <= 0) return "";
  if (activeTab === "compra" && bid > 0) return (cantidad * bid).toFixed(2);
  if (activeTab === "venta" && ask > 0) return (cantidad / ask).toFixed(2);
  return "";
}

function sendFromReceive(
  receiveText: string,
  activeTab: ExchangeType,
  bid: number,
  ask: number,
): string {
  const cantidad = Number(receiveText.trim());

  if (cantidad <= 0) return "";

  if (activeTab === "compra" && bid > 0) return (cantidad / bid).toFixed(2);

  if (activeTab === "venta" && ask > 0) return (cantidad * ask).toFixed(2);

  return "";
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [tab, setTab] = useState<ExchangeType>("compra");
  const [coupon, setCoupon] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [exchanges, setExchanges] = useState<Exchange>({
    ask: 0,
    bid: 0,
  });
  const setDataExchangeStore = useExchangeStore((s) => s.setData);

  const { sendCurrency, receiveCurrency } = MAP_TABS[tab];

  const handleTabs = (nextTab: ExchangeType) => {
    setTab(nextTab);
    setReceiveAmount(
      receiveFromSend(sendAmount, nextTab, exchanges.bid, exchanges.ask),
    );
  };

  const handleSendChange = (text: string) => {
    setSendAmount(text);
    setReceiveAmount(
      receiveFromSend(text, tab, exchanges.bid, exchanges.ask),
    );
  };

  const handleReceiveChange = (text: string) => {
    setReceiveAmount(text);
    setSendAmount(
      sendFromReceive(text, tab, exchanges.bid, exchanges.ask),
    );
  };

  const startOperation = () => {
    if(sendAmount === "" || receiveAmount === "") return;

    setDataExchangeStore({
      tab,
      sendAmount,
      receiveAmount,
      bid: exchanges.bid,
      ask: exchanges.ask,
      coupon,
      originBankId: null,
      destinationCuentaId: null,
      sourceFundId: null,
    });

    navigation.navigate("Exchange");
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      const res = await getExchanges();
      if (res.data.success) setExchanges(res.data.data);
    };

    fetchExchanges();
  }, []);

  return (
    <AppSafeArea
      edges={["top", "bottom"]}
      outerClassName="flex-1 bg-kambista-screen"
      contentContainerStyle={{ paddingTop: 24 }}
    >
      <View className="mb-7 items-center">
        <Image
          source={require("../../../assets/kambista_logo.png")}
          style={{ width: 180, height: 50 }}
          resizeMode="contain"
        />
      </View>

      <View className="rounded-2xl bg-white p-5" style={CARD_ELEVATION_STYLE}>
        {/* Compra / Venta */}
        <View className="mb-4 flex-row overflow-hidden rounded-xl bg-kambista-screen p-1">
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: tab === "compra" }}
            onPress={() => handleTabs("compra")}
            className={`flex-1 items-center rounded-lg py-3 ${tab === "compra" ? "bg-kambista-navy" : "bg-white"
              }`}
          >
            <Text
              className={`text-center text-[13px] font-semibold ${tab === "compra" ? "text-white" : "text-gray-500"
                }`}
              numberOfLines={1}
            >
              Compra: {exchanges.bid}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: tab === "venta" }}
            onPress={() => handleTabs("venta")}
            className={`flex-1 items-center rounded-lg py-3 ${tab === "venta" ? "bg-kambista-navy" : "bg-white"
              }`}
          >
            <Text
              className={`text-center text-[13px] font-semibold ${tab === "venta" ? "text-white" : "text-gray-500"
                }`}
              numberOfLines={1}
            >
              Venta: {exchanges.ask}
            </Text>
          </Pressable>
        </View>

        <View className="overflow-visible">
          <View className="flex-row mb-6">
            <View className="min-h-[56px] min-w-0 flex-1 rounded-l-xl bg-gray-100 px-3 py-3">
              <Text className="text-xs text-kambista-muted">
                ¿Cuánto envías?
              </Text>
              <Input
                variant="embed"
                containerClassName="flex-1 min-w-0"
                value={sendAmount}
                onChangeText={handleSendChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
            <View className="min-h-[56px] w-[112px] items-center justify-center rounded-r-xl bg-kambista-navy px-2.5 py-3">
              <Text
                className="text-center text-sm font-semibold text-white"
                numberOfLines={1}
              >
                {sendCurrency}
              </Text>
            </View>
          </View>

          <View className="absolute bottom-1/3 right-1/3 z-10 shadow-xl w-16 h-16 flex items-center justify-center rounded-full bg-black/10">
            <Pressable
              accessibilityRole="button"
              className="h-10 w-10 items-center justify-center rounded-full border border-kambista-border bg-white shadow-lg"
              onPress={() => handleTabs(tab === "compra" ? "venta" : "compra")}
            >
              <Icon name="sync" size={20} color="#0A1F33" />
            </Pressable>
          </View>

          <View className="flex-row">
            <View className="min-h-[56px] min-w-0 flex-1 rounded-l-xl bg-gray-100 px-3 py-3">
              <Text className="text-xs text-kambista-muted">
                Entonces recibes
              </Text>
              <Input
                variant="embed"
                containerClassName="flex-1 min-w-0"
                value={receiveAmount}
                onChangeText={handleReceiveChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
            <View className="min-h-[56px] w-[112px] items-center justify-center rounded-r-xl bg-kambista-navy px-2.5 py-3">
              <Text
                className="text-center text-sm font-semibold text-white"
                numberOfLines={1}
              >
                {receiveCurrency}
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-4 mt-5 flex-row justify-between gap-4">
          <View className="min-w-0 flex-1">
            <Text className="text-xs text-kambista-muted">Ahorro estimado:</Text>
            <Text className="mt-0.5 text-base font-bold text-kambista-navy">
              S/ 555.00
            </Text>
          </View>
          <View className="min-w-0 flex-1 items-end">
            <Text className="text-xs text-kambista-muted">Koins</Text>
            <Text className="mt-0.5 text-base font-bold text-kambista-navy">
              10,000
            </Text>
          </View>
        </View>

        <View className="mb-4 flex-row overflow-hidden rounded-xl border border-kambista-border bg-white">
          <TextInput
            value={coupon}
            onChangeText={setCoupon}
            placeholder="Ingresa el cupón"
            placeholderTextColor={PLACEHOLDER_GRAY}
            className="min-h-[48px] flex-1 border-r border-kambista-border bg-white px-3 py-3 text-base text-kambista-navy"
          />
          <Button
            variant="fill"
            tone="navySolid"
            fullWidth={false}
            onPress={() => { }}
            className="min-h-[48px] justify-center self-stretch rounded-none px-5 py-3"
          >
            APLICAR
          </Button>
        </View>

        <View className="flex-row gap-2">
          <Icon name="star" size={18} color="#5BE2C4" style={{ marginTop: 2 }} />
          <Text className="flex-1 text-xs leading-5 text-gray-600">
            ¿Monto mayor a $5.000 o S/18.000?{" "}
            <Text className="font-bold text-kambista-navy underline">
              ¡Obtén un Tipo de Cambio Preferencial!
            </Text>
          </Text>
        </View>
      </View>

      <View className="mt-8">
        <Button
          variant="fill"
          tone="cyan"
          onPress={startOperation}
          disabled={sendAmount === "" || receiveAmount === ""}
        >
          INICIAR OPERACIÓN
        </Button>
      </View>
    </AppSafeArea>
  );
}
