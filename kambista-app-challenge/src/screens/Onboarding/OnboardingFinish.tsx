import { Image, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/Wrapper";
import img from "../../../assets/k_phone.png";
import KButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/BuildNavigation";
import { Paths } from "../../routes/paths";
import { useUserStore } from "../../store/userStore";

export function OnboardingFinish(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useUserStore();
  const goToHome = () => {
    navigation.navigate(Paths.app);
  }
  return(
    <ScreenWrapper>
      <Text className="text-center font-montBold">Perfil creado con éxito</Text>
      <View className="flex-1 items-center justify-center gap-7">
        <Image source={img} className="w-96 h-48" resizeMode="contain" />
        <Text className="text-xl font-montBold text-center">{`¡Felicitaciones ${user.name}, tu perfil ha sido creado!`}</Text>
        <Text className="text-base font-mont text-center">
          Ya puede empezar a <Text className="font-montItalic">Kambiar</Text> con la mejor tasa del mercado
        </Text>
        <View className="w-full mt-5">
          <KButton
            title="CONTINUAR"
            onPress={() => goToHome()}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}