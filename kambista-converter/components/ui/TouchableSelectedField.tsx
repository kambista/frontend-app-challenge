import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { CustomPicker, Option } from './CustomPicker';
import { ChevronBottomIcon } from '../icons/ChevronBottomIcon';

interface Props {
  type?: 'sheet' | 'menu';
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  widthClassName?: string;
  style?: StyleProp<ViewStyle>;
  showAccept?: boolean;
}

export const TouchableSelectedField: React.FC<Props> = ({
  type = 'menu',
  options,
  value,
  onChange,
  label,
  placeholder = 'Selecciona',
  widthClassName = 'w-full',
  style,
  showAccept = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const togglePicker = () => setIsVisible((v) => !v);

  return (
    <View style={style} className={`${widthClassName} mb-1`}>
      <CustomPicker
        variant={type}
        options={options}
        selectedValue={value}
        onValueChange={onChange}
        isVisible={isVisible}
        togglePicker={togglePicker}
        label={label}
        showAccept={showAccept}
        placeholder={placeholder}
        renderTrigger={(displayLabel, open) => (
          <TouchableOpacity
            onPress={open}
            activeOpacity={0.8}
            className="flex-row items-center justify-between px-4 py-3 bg-white border"
            style={{
              borderColor: '#E0E0E0',
              borderRadius: 8,
            }}
          >
            <Text
              className="flex-1 font-montserrat-medium text-secondary"
              numberOfLines={1}
              style={{ fontSize: 14 }}
            >
              {displayLabel}
            </Text>
            <ChevronBottomIcon />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
