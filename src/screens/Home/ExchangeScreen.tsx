import { CommonActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import AppSafeArea from "../../components/AppSafeArea";
import Icon from "../../components/Icon";
import StepperHeader from "../../components/StepperHeader";
import CompleteDataStep from "../../components/steps/CompleteDataStep";
import ConstanciaEnviadaStep from "../../components/steps/ConstanciaEnviadaStep";
import ConstanciaStep from "../../components/steps/ConstanciaStep";
import TransferStep from "../../components/steps/TransferStep";
import type { AppStackParamList } from "../../navigation/navigation.types";
import { useExchangeStore } from "../../stores/exchange/exchangeStore";

const TITLES: Record<1 | 2 | 3, string> = {
  1: "Completa los datos",
  2: "Transfiere a Kambista",
  3: "Envía tu constancia",
};

type ExchangeNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "Exchange"
>;

export default function ExchangeScreen() {
  const navigation = useNavigation<ExchangeNavigationProp>();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [flowPhase, setFlowPhase] = useState<"steps" | "success">("steps");

  const goHomeAndReset = () => {
    useExchangeStore.getState().reset();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "BottomTab",
            state: {
              routes: [{ name: "Home" }],
              index: 0,
            },
          },
        ],
      }),
    );
  };

  const handleHeaderBack = () => {
    if (currentStep > 1) {
      setCurrentStep((c) => (c === 3 ? 2 : 1));
      return;
    }

    navigation.goBack();
  };

  return (
    <AppSafeArea
      edges={["top", "bottom"]}
      outerClassName="flex-1 bg-kambista-screen"
      contentContainerStyle={{ paddingTop: flowPhase === "success" ? 8 : 16 }}
    >
      {flowPhase === "steps" ? (
        <>
          <View className="relative mb-2 flex-row items-center justify-center py-1">
            <Pressable
              accessibilityRole="button"
              onPress={handleHeaderBack}
              className="absolute left-0 z-10 p-2"
              hitSlop={12}
            >
              <Icon name="chevron-back" size={26} color="#0A1F33" />
            </Pressable>
            <Text className="px-10 text-center text-lg font-bold text-kambista-navy">
              {TITLES[currentStep]}
            </Text>
          </View>

          <StepperHeader activeStep={currentStep} />
        </>
      ) : null}

      {flowPhase === "success" ? (
        <ConstanciaEnviadaStep onVolverInicio={goHomeAndReset} />
      ) : null}

      {flowPhase === "steps" && currentStep === 1 ? (
        <CompleteDataStep onContinue={() => setCurrentStep(2)} />
      ) : null}
      {flowPhase === "steps" && currentStep === 2 ? (
        <TransferStep onContinue={() => setCurrentStep(3)} />
      ) : null}
      {flowPhase === "steps" && currentStep === 3 ? (
        <ConstanciaStep onSuccess={() => setFlowPhase("success")} />
      ) : null}
    </AppSafeArea>
  );
}
