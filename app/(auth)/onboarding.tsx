import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import TopBar from "@/components/TopBar";
import OnboardingForm from "@/modules/onboarding/components/OnboardingForm";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleCancel = () => {
    logout();
    router.push("/login");
  };

  return (
    <View className="h-full bg-white">
      <TopBar
        title="Completa tus datos"
        leftIcon={<ArrowLeftIcon size={26} color="#060F26" />}
        rightIcon={<LogoutIcon size={24} color="#060F26" />}
        onLeftPress={handleCancel}
        onRightPress={handleCancel}
      />
      <OnboardingForm router={router} />
    </View>
  );
}
