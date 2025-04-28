import Button from "@/components/Button";
import StarIcon from "@/components/Icons/StarIcon";
import CouponInput from "@/modules/home/components/CouponInput";
import CurrencyInput from "@/modules/home/components/CurrencyInput";
import Tab from "@/modules/home/components/Tab";
import { Router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Controller, set, useForm, useWatch } from "react-hook-form";
import { ExchangeFormTypes } from "./types";
import { defaultValues } from "./utils";
import KoinksIcon from "@/components/Icons/KoinksIcon";
import useDebounce from "@/hooks/useDebounce";
import Toast from "react-native-toast-message";
import { useExchangeStore } from "@/stores/useExchangeStore";
import ReloadButton from "../ReloadButton";
import { useCalculateExchange } from "../../hooks/useCalculateExchange";

type ModeType = "buy" | "sell";
type InputFieldType = "amountIn" | "amountOut";

interface IEstimatedSavings {
  amount: string;
  currency: string;
}

interface ExchangeFormProps {
  router: Router;
  currentExchange?: {
    ask: number;
    bid: number;
  };
}

const ExchangeForm = ({ router, currentExchange }: ExchangeFormProps) => {
  const [mode, setMode] = React.useState<ModeType>("buy");
  const [couponApplied, setCouponApplied] = React.useState(false);
  const [estimatedSavings, setEstimatedSavings] =
    React.useState<IEstimatedSavings | null>(null);
  const [lastChangedField, setLastChangedField] =
    React.useState<InputFieldType>("amountIn");
  const reloadButtonRef =
    React.useRef<React.ElementRef<typeof ReloadButton>>(null);
  const { setExchangeData } = useExchangeStore();

  const CalculateExchange = useCalculateExchange();

  const {
    formState: { isValid },
    control,
    getValues,
    setValue,
    handleSubmit
  } = useForm<ExchangeFormTypes>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const amountIn = useWatch({ control, name: "amountIn" });
  const amountOut = useWatch({ control, name: "amountOut" });

  const getCurrencies = (inputField: InputFieldType) => {
    const isPenToUsd = (mode === "buy") === (inputField === "amountIn");

    return isPenToUsd
      ? { origin: "PEN", destination: "USD" }
      : { origin: "USD", destination: "PEN" };
  };

  const handleTabPress = (tab: ModeType) => {
    setMode(tab);
    reloadButtonRef.current?.triggerAnimation();
  };

  const handleCalculateExchange = async (
    amount: string,
    inputField: InputFieldType
  ) => {
    if (amount === "" || Number(amount) <= 0) {
      setEstimatedSavings(null);
      inputField === "amountIn"
        ? setValue("amountOut", "0.00", { shouldValidate: true })
        : setValue("amountIn", "0.00", { shouldValidate: true });
      return;
    }
    setLastChangedField(inputField);

    const { origin, destination } = getCurrencies(inputField);
    const amountToUse = getValues(inputField);

    const res = await CalculateExchange.handle({
      originCurrency: origin,
      destinationCurrency: destination,
      amount: Number(amountToUse)
    });

    if (res) {
      if (!res.data.operate) {
        Toast.show({
          type: "error",
          text1: res.data.msg
        });
        return;
      }
      const fieldToUpdate =
        inputField === "amountIn" ? "amountOut" : "amountIn";
      setValue(fieldToUpdate, res.exchange.toString() || "", {
        shouldValidate: true
      });

      setEstimatedSavings({
        amount: res.savings?.amount || "0",
        currency: res.savings?.currency || origin
      });
    }
  };

  const getKoinks = () => {
    if (CalculateExchange.loading) return 0;
    if (mode === "buy") return Math.floor(Number(amountIn)).toString();
    else return Math.floor(Number(amountOut)).toString();
  };

  const debouncedCalculateExchange = useDebounce(handleCalculateExchange, 500);

  const submitForm = async (value: ExchangeFormTypes) => {
    setExchangeData({
      amountIn: { amount: Number(value.amountIn), currency: "PEN" },
      amountOut: { amount: Number(value.amountOut), currency: "USD" },
      ask: CalculateExchange.data?.tc.ask,
      bid: CalculateExchange.data?.tc.bid,
      couponCode: value.couponCode || null
    });
    router.push("/(operations)/transactions");
  };

  React.useEffect(() => {
    const currentValue = lastChangedField === "amountIn" ? amountIn : amountOut;
    if (currentValue && Number(currentValue) > 0) {
      handleCalculateExchange(currentValue, lastChangedField);
    }
  }, [mode]);

  return (
    <View className="flex-col gap-4">
      <View>
        <View className="flex-row items-center justify-between border border-b-gray-30 border-t-transparent border-x-transparent">
          <Tab
            title={`Compra: ${currentExchange?.bid}`}
            isActive={mode === "buy"}
            onPress={() => handleTabPress("buy")}
          />
          <Tab
            title={`Venta: ${currentExchange?.ask}`}
            isActive={mode === "sell"}
            onPress={() => handleTabPress("sell")}
          />
        </View>
        <View className="flex-col gap-3 px-4 pt-8 pb-2 bg-white rounded-b-lg">
          <View className="relative flex-col gap-3">
            <Controller
              control={control}
              name="amountIn"
              render={({ field: { onChange, value } }) => (
                <CurrencyInput
                  value={value}
                  onChange={(v) => {
                    const value = v.toString();
                    onChange(value);
                    debouncedCalculateExchange(value, "amountIn");
                  }}
                  label="¿Cuánto envías?"
                  currencyLabel={mode === "sell" ? "Dólares" : "Soles"}
                />
              )}
            />

            <ReloadButton
              ref={reloadButtonRef}
              onPress={() =>
                setMode((prev) => (prev === "buy" ? "sell" : "buy"))
              }
            />
            <Controller
              control={control}
              name="amountOut"
              render={({ field: { onChange, value } }) => (
                <CurrencyInput
                  value={value}
                  onChange={(v) => {
                    const value = v.toString();
                    onChange(value);
                    debouncedCalculateExchange(value, "amountOut");
                  }}
                  label="Entonces recibes"
                  currencyLabel={mode === "sell" ? "Soles" : "Dólares"}
                />
              )}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-col gap-1">
              <Text className="text-sm font-montserrat-medium text-primary-dark">
                Ahorro estimado
              </Text>
              <Text className="text-sm font-montserrat-semibold text-primary-dark">
                {estimatedSavings?.currency} {estimatedSavings?.amount || 0}
              </Text>
            </View>
            <View className="flex-col items-end gap-1">
              <Text className="text-sm font-montserrat-medium text-primary-dark">
                Koins
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm font-montserrat-semibold text-primary-dark">
                  {getKoinks()}
                </Text>
                <KoinksIcon size={18} color="#fabc49" />
              </View>
            </View>
          </View>
          <View className="flex-col gap-4 mt-5">
            <Controller
              control={control}
              name="couponCode"
              render={({ field: { onChange, value } }) => (
                <CouponInput
                  value={value}
                  onClick={() => {
                    if (couponApplied) {
                      setCouponApplied(false);
                      onChange("");
                      Toast.show({
                        type: "info",
                        text1: "Cupón removido"
                      });
                      return;
                    }
                    const couponCode = "MICASA21";
                    setCouponApplied(true);
                    onChange(couponCode);
                    Toast.show({
                      type: "success",
                      text1: "Cupón aplicado"
                    });
                  }}
                  onChange={onChange}
                  isApplied={couponApplied}
                  disabled={couponApplied}
                />
              )}
            />
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
        onPress={() => handleSubmit(submitForm)()}
        disabled={!isValid}
      >
        INICIAR OPERACIÓN
      </Button>
    </View>
  );
};

export default ExchangeForm;
