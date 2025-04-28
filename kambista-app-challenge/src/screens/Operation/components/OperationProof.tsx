import { Image, Text, View } from "react-native";
import img from '../../../../assets/k_reports.png'
import { Dot, ImageIcon } from "lucide-react-native";
import KambistaColors from "../../../utils/colors";
import KButton from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParamList } from "../../../navigation/BuildNavigation";
import { Paths } from "../../../routes/paths";

export function OperationProof(){
  const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  function changeStep(){
    navigation.navigate(Paths.operationFinish);
  }
  return <View>
    <View className="px-5 py-4 m-2 rounded-lg border-2 border-k-gray-25 bg-white">
      <View className="items-center my-4">
        <Image source={img} className="w-48 h-20" resizeMode="contain" />
        <Text className="font-mont">Adjunta la constancia de tu transferencia para poder verificar tu operación.</Text>
        <View className="border-2  gap-2 my-4 border-k-gray-25 w-full p-3 rounded-md">
          <Text className="font-mont text-sm">Sube el archivo de tu constancia</Text>
          <View className=" flex-row justify-between border-2 border-k-gray-25 px-3 py-1 rounded-lg items-center">
            <Text className="font-mont text-k-gray-60 text-sm">Selecciona archivo</Text>
            <ImageIcon color={KambistaColors.secondary} />
          </View>
          <Text className="font-mont text-xs mt-2">*Tamaño máximo permitido del archivo 10 Mb</Text>
        </View>
        <View className="item-start">
          <Text className="text-sm font-mont">
            Recuerda:
          </Text>
          <View className="flex-row items-start justify-start">
            <Dot size={18} color={KambistaColors.gray60} />
            <Text className="font-mont text-sm">El voucher enviado debe tener el 
              <Text className="font-montBold text-sm">monto, datos,del beneficiario, fecha y hora.</Text>
            </Text>
          </View>
          <View className="flex-row items-center justify-start">
            <Dot color={KambistaColors.gray60} size={18} />
            <Text className="font-mont text-sm">
              El voucher debe ser legible.
            </Text>
          </View>
          <View className="flex-row items-center justify-start">
            <Dot size={18} color={KambistaColors.gray60} />
            <Text className="font-mont text-sm">Archivos permitidos
              <Text className="font-montBold text-sm">Imagénes, word y PDF</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
    <KButton
      title="Enviar Constancia"
      onPress={() => changeStep()}
    />
  </View>
}