import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronBottomIcon } from '../../components/icons/ChevronBottomIcon';

interface Props {
  label: string;
  amount: string;
  onAmountChange: (v: string) => void;
  currencyLabel: string;
  onToggleCurrency: () => void;
  editable?: boolean;
  style?: string;
}

export const CurrencyInput: React.FC<Props> = ({
  label,
  amount,
  onAmountChange,
  currencyLabel,
  onToggleCurrency,
  editable = true,
  style = '',
}) => (
  <View className={`flex-row ${style}`}>
    <View
      className="flex-1 bg-gray-25 px-5 py-3"
      style={{
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
      }}
    >
      <Text
        className="text-secondary mb-1 font-montserrat-medium"
        style={{ fontSize: 14 }}
      >
        {label}
      </Text>
      <TextInput
        editable={editable}
        keyboardType="numeric"
        value={amount}
        onChangeText={onAmountChange}
        placeholder="0"
        placeholderTextColor="#9CA3AF"
        className="text-secondary font-montserrat-bold p-0 m-0"
        style={{
          fontSize: 20,
        }}
      />
    </View>

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onToggleCurrency}
      className="w-[100px] bg-secondary flex-row items-center justify-end px-3"
      style={{
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      <Text className="text-white font-montserrat-bold mr-2">
        {currencyLabel}
      </Text>
      <ChevronBottomIcon currentColor="#fff" />
    </TouchableOpacity>
  </View>
);
