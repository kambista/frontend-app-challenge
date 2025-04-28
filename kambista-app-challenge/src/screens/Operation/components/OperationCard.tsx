import { Pressable, Text, TextInput, View } from "react-native";
import KambistaColors from "../../../utils/colors";
import { useOperation } from "../../../store/OperationStore";
import { currencySymbols } from "../../../utils/functions";

export function OperationCard(){
  const {operation} = useOperation();
  return(
    <View className="w-full rounded-md py-4 px-6 bg-white">
      <View className="flex-row justify-between">
        <Text className="font-mont">Tú envias</Text>
        <Text className="font-montBold">{`${currencySymbols[operation.incomingCurrency]} ${operation.incoming.toFixed(2)}`}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="font-mont">Tú recibes</Text>
        <Text className="font-montBold">{`${currencySymbols[operation.outcomingCurrency]} ${operation.exchange.toFixed(2)}`}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="font-mont">Cupón aplicado</Text>
        <Text className="font-montBold">{operation.coupon}</Text>
      </View>
      <View className="h-px w-full bg-gray-800 my-4" />
      <View className="flex-row justify-between">
        <Text className="font-mont">Tipo de cambio utilizado</Text>
        <Text className="font-montBold text-warning">{`${operation.bid.toFixed(3)}`}<Text className="text-black">{` ${operation.ask.toFixed(3)}`}</Text></Text>
      </View>
    </View>
  );
}