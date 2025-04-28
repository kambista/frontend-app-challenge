import { Pressable, Text, TextInput, View } from "react-native";
import KambistaColors from "../../../utils/colors";
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  value: string,
  setValue: (text: string) => void;
}

export function CouponInput({value, setValue}: Props){
  const onChange = (e: string) => {
    setValue(e);
  };
  return(
    <View className="w-full rounded-md flex-row shadow-lg">
      <View style={{flex: 7}} className="p-3 rounded-l-xl bg-white border border-k-gray-25">
        <TextInput
          className="w-full text-k-gray-40 font-mont text-center text-md"
          placeholder={'Ingresa el cupon'}
          onChangeText={onChange}
          value={value}
          placeholderTextColor={KambistaColors.gray40}
        />
      </View>
      <Pressable style={{flex: 3}} className="bg-black p-1 justify-center items-center rounded-r-xl">
        <Text className="text-white font-montBold text-sm">APLICAR</Text>
      </Pressable>
    </View>
  );
}