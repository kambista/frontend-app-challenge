import { Text, TextInput, View } from "react-native";
import KambistaColors from "../../../utils/colors";
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from "@react-native-picker/picker";
import { ExchangePicker } from "./ExchangePicker";
import { Currencies } from "../../../store/OperationStore";

interface Props {
  value?: string,
  setValue?: (text: string) => void;
  currency: Currencies,
  setCurrency: (currency: Currencies) => void;
  label: string
  currencies: Array<{label: string, value: string}>
  onEndEditing: (e: any) => void;
  editable?: boolean,
}

export function ExchangeInput({value, setValue, label, currency, setCurrency, currencies, onEndEditing, editable = true}: Props){
  const onChange = (e: string) => {
    if(setValue){
      setValue(e);
    }
  };
  return(
    <View className="w-full rounded-md flex-row">
      <View style={{flex: 5}} className="bg-k-gray-25 p-4 rounded-l-lg">
        <Text className="font-mont text-sm">{label}</Text>
        <TextInput
          className="w-full text-secondary font-montBold text-md"
          placeholder={'0.00'}
          keyboardType="decimal-pad"
          editable={editable}
          onChangeText={onChange}
          value={value}
          onEndEditing={(e) => onEndEditing(e)}
          placeholderTextColor={KambistaColors.gray40}
        />
      </View>
      <View style={{flex: 4}} className="bg-black rounded-r-lg justify-center items-center">
        <ExchangePicker
          value={currency}
          setValue={setCurrency}
          items={currencies}
        />
      </View>
    </View>
  );
}