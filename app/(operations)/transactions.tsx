import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import StepIndicator from "@/modules/transactions/components/StepIndicator";
import TopBar from "@/components/TopBar";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import FillOutStep from "@/modules/transactions/screens/Steps/FillOut";
import TransferStep from "@/modules/transactions/screens/Steps/Transfer/CompanyInfo";
import ConfirmationStep from "@/modules/transactions/screens/Steps/Confirmation";

const TransactionsScreen = () => {
  const [step, setStep] = React.useState(0);
  const router = useRouter();

  const handleToHome = () => router.push("/(tabs)/home");
  const stepComponents: Record<number, React.ReactNode> = {
    0: <FillOutStep onContinue={() => setStep(1)} />,
    1: <TransferStep onContinue={() => setStep(2)} />,
    2: (
      <ConfirmationStep
        onContinue={() => router.push("/(operations)/summary")}
      />
    )
  };

  return (
    <View className="flex-1 bg-gray-10">
      <TopBar
        title="Completa tus datos"
        leftIcon={<ArrowLeftIcon size={26} color="#060F26" />}
        onLeftPress={handleToHome}
        className="bg-transparent"
      />
      <StepIndicator
        steps={["Completa", "Transfiere", "Constancia"]}
        currentStep={step}
      />
      <ScrollView>{stepComponents[step]}</ScrollView>
    </View>
  );
};

export default TransactionsScreen;
