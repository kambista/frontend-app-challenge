import { memo, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ChevronBottomIcon } from '../icons/ChevronBottomIcon';

type Option = {
  label: string;
  value: string;
};

interface Props {
  label?: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  isVisible: boolean;
  togglePicker: () => void;
  error?: boolean;
  errorMessage?: string;
  widthClassName?: string;
  placeholder?: string;
}

const OptionItem = memo(
  ({
    item,
    selectedValue,
    onSelect,
  }: {
    item: Option;
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => (
    <TouchableOpacity
      className={`py-4 px-5 border-b border-gray-25 ${
        item.value === selectedValue ? 'bg-[#EBF5FF]' : ''
      }`}
      onPress={() => onSelect(item.value)}
    >
      <Text
        className={`text-[15px] ${
          item.value === selectedValue
            ? 'text-[#2563EB] font-semibold'
            : 'text-gray-700 font-medium'
        }`}
        style={{
          fontFamily:
            item.value === selectedValue
              ? 'Montserrat-SemiBold'
              : 'Montserrat-Medium',
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  ),
);

export const CustomPicker = memo(
  ({
    options,
    selectedValue,
    onValueChange,
    isVisible,
    togglePicker,
    error,
    errorMessage,
    widthClassName = 'w-full',
    placeholder = 'Selecciona',
  }: Props) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const displayText = useMemo(() => {
      const selectedOption = options.find(
        (option) => option.value === selectedValue,
      );
      return selectedOption ? selectedOption.label : placeholder;
    }, [options, selectedValue, placeholder]);

    const handleSelectOption = useCallback(
      (value: string) => {
        onValueChange(value);

        timeoutRef.current = setTimeout(() => {
          togglePicker();
        }, 50);
      },
      [onValueChange, togglePicker],
    );

    const renderOption = useCallback(
      ({ item }: { item: Option }) => (
        <OptionItem
          item={item}
          selectedValue={selectedValue}
          onSelect={handleSelectOption}
        />
      ),
      [selectedValue, handleSelectOption],
    );

    const keyExtractor = useCallback((item: Option) => item.value, []);

    return (
      <View className={`${widthClassName} mb-3`}>
        <TouchableOpacity
          onPress={togglePicker}
          className={`flex-row items-center justify-between border rounded-lg px-4 py-3 h-[50px] bg-white ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
          activeOpacity={0.9}
        >
          <Text
            style={{
              fontSize: 14,
            }}
            className={`flex-1 font-montserrat-medium ${
              selectedValue ? 'text-secondary' : 'text-gray-40'
            }`}
            numberOfLines={1}
          >
            {displayText}
          </Text>

          <View className="pl-2">
            <ChevronBottomIcon />
          </View>
        </TouchableOpacity>

        {error && errorMessage && (
          <Text
            className="text-red-500 text-xs mt-1"
            style={{ fontFamily: 'Montserrat-Regular' }}
          >
            {errorMessage}
          </Text>
        )}

        {isVisible && (
          <Modal
            visible={true}
            transparent
            animationType="slide"
            onRequestClose={togglePicker}
          >
            <View className="flex-1 justify-end bg-[rgba(0,0,0,0.5)]">
              <TouchableOpacity
                className="flex-1"
                onPress={togglePicker}
                activeOpacity={1}
              />

              <SafeAreaView className="bg-white rounded-t-2xl shadow-lg shadow-black/10">
                <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-25">
                  <Text
                    className=" text-gray-900 font-montserrat-bold"
                    style={{ fontSize: 16 }}
                  >
                    Seleccionar
                  </Text>
                  <TouchableOpacity
                    onPress={togglePicker}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text
                      className="text-blue font-montserrat-semibold"
                      style={{ fontSize: 14 }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={options}
                  renderItem={renderOption}
                  keyExtractor={keyExtractor}
                  showsVerticalScrollIndicator={false}
                  bounces
                  style={{ maxHeight: 350 }}
                />
              </SafeAreaView>
            </View>
          </Modal>
        )}
      </View>
    );
  },
);
