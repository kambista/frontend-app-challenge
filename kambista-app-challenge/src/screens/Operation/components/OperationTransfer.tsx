import { Image, Text, View } from "react-native";
import img from '../../../../assets/k_bill.png'
import { CopyIcon } from "lucide-react-native";
import KambistaColors from "../../../utils/colors";
import KButton from "../../../components/Button";
import { useStepOperationStore } from "../../../store/StepOperationStore";

interface Props {
  label: string,
  value: string,
  canCopy?: boolean,
}

function LabelValue({value, label, canCopy = false}: Props){
  return(
    <View>
      <Text className="font-mont text-xs">{label}</Text>
      <View className="flex-row gap-3">
        <Text className="font-montBold text-xs ml-3">{value}</Text>
        <CopyIcon color={KambistaColors.gray40} size={14} />
      </View>
    </View>
  );
}

export function OperationTransfer(){
  const {step, setStep} = useStepOperationStore();
  function changeStep(){
    setStep(step + 1);
  }
  return (
    <View className="py-2 px-5">
      <View className="flex-row gap-2 justify-center mb-2">
        <Text className="font-mont text-xs">El tipo de cambio podria actualizarse a las:</Text>
        <Text className="text-base text-k-gray-60 font-montBold">13:15</Text>
      </View>
      <View className="rounded-lg bg-white border-2 border-k-gray-20 py-3 px-8 mt-3 mb-5">
        <View className="items-center my-4">
          <Image source={img} className="w-48 h-20" resizeMode="contain" />
        </View>
        <Text className="font-mont text-base justify-normal">Transfiere desde tu app bancaria y guarda el 
          <Text className="font-montBold underline"> número o código de operación </Text> 
          para el siguiente paso.
        </Text>
        <View className="m-3 rounded-md border-k-gray-20 border-2 p-4 gap-2 ">
          <LabelValue
            label="Banco"
            value="Interbank"
          />
          <LabelValue
            label="Monto"
            value="S/. 1000.00"
          />
          <LabelValue
            label="Numero de cuenta"
            value="21000200000000"
          />
          <LabelValue
            label="RUC"
            value="20601780141"
          />
          <LabelValue
            label="Titular de la cuenta"
            value="Kambista SAC"
          />
          <LabelValue
            label="Tipo de cuenta"
            value="Corriente"
          />
        </View>
      </View>
      <KButton
        title="Ya hice mi transferencia"
        onPress={() => changeStep()}
      />
    </View>
  );
}