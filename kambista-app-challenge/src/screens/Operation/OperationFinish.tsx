import { Image, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/Wrapper";
import img from "../../../assets/k_verification_completed.png";
import img2 from "../../../assets/k_discount_banner.png";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParamList } from "../../navigation/BuildNavigation";
import { Paths } from "../../routes/paths";
import { useUserStore } from "../../store/userStore";
import KButton from "../../components/Button";

export function OperationFinish(){
  const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  const goToHome = () => {
    navigation.replace(Paths.app);
  }
  return(
    <ScreenWrapper style={{backgroundColor: '#F1F0F0FF'}}>
      <View className="flex-1 items-center justify-center gap-7 px-6">
        <View className="border-2 border-k-gray-25 p-4 rounded-2xl w-full bg-white">
          <View className="justify-center items-center">
            <Image source={img} className="w-48 h-36" resizeMode="contain" />
          </View>
          <View>
            <Text className="font-montBold text-lg text-center mt-8">Constancia enviada!</Text>
            <View className="h-px w-full bg-gray-400 my-2" />
            <Text className="font-montBold text-k-gray-60 text-sm">Codigo Kambista</Text>
            <Text className="font-montBold text-sm ml-2 mb-2">codeddddd</Text>
            <Text className="font-mont text-sm mb-2">*Usa tu código para dar seguimiento a tu operación.</Text>
            <Text className="font-montBold text-k-gray-60 text-sm">Monto a recibir</Text>
            <Text className="font-montBold text-sm ml-2 mb-2">S/. 343.00</Text>
            <Text className="font-montBold text-k-gray-60 text-sm">Tiempo estimado de espera</Text>
            <Text className="font-montBold text-sm ml-2">20h 15min</Text>
          </View>
        </View>
        <View className="justify-center items-center">
          <Image source={img2} className="w-fit h-30" resizeMode="contain" />
        </View>
        <Text className="font-mont flex-1 text-sm text-center">Verificaremos tu operación. Puedes ver su estado en “Mis operaciones”.</Text>
        <View className="w-full">
          <KButton
            title="Volver a inicio"
            onPress={() => goToHome()}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}