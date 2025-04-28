import { Pressable, View, Text } from 'react-native';
import { Check } from 'lucide-react-native';
import { useState } from 'react';

interface Props {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({ label, checked = false, onChange }: Props) {
  const [isChecked, setChecked] = useState(checked);

  const toggle = () => {
    setChecked(!isChecked);
    onChange?.(!isChecked);
  };

  const boxStyle = `
    w-4 h-4 rounded border justify-center items-center
    ${isChecked ? 'bg-secondary border-secondary' : 'border-k-gray-40'}
  `;

  return (
    <Pressable
      onPress={toggle}
      className="flex-row items-center space-x-2"
    >
      <View className={boxStyle}>
        {isChecked && <Check size={14} color="white" />}
      </View>
      {label && <Text className="ml-2 font-mont text-k-gray-60 text-xs">{label}</Text>}
    </Pressable>
  );
}
