import { useState, memo, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ChevronBottomIcon } from '../icons/ChevronBottomIcon';

export type Option = { label: string; value: string };
type Variant = 'sheet' | 'menu';

interface Props {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  isVisible: boolean;
  togglePicker: () => void;
  label?: string;
  placeholder?: string;
  widthClassName?: string;
  error?: boolean;
  errorMessage?: string;
  showHeader?: boolean;
  showCancel?: boolean;
  cancelText?: string;
  showAccept?: boolean;
  acceptText?: string;
  onAccept?: () => void;
  renderTrigger?: (
    displayLabel: string,
    openPicker: () => void,
  ) => React.ReactNode;
  variant?: Variant;
}

const OptionItem = memo(
  ({
    item,
    selectedValue,
    onSelect,
    variant,
  }: {
    item: Option;
    selectedValue: string;
    onSelect: (value: string) => void;
    variant: Variant;
  }) => {
    const isSelected = item.value === selectedValue;

    const baseRow =
      variant === 'sheet' ? 'border-b border-gray-25 px-5 py-4' : 'px-5 py-4';

    const bgStyle = isSelected
      ? { backgroundColor: variant === 'sheet' ? '#EFF0F6' : '#F7F8FA' }
      : { backgroundColor: '#FFFFFF' };

    const textColor = isSelected
      ? '#686868'
      : variant === 'sheet'
        ? '#9CA3AF'
        : '#060F26';

    return (
      <TouchableOpacity
        className={baseRow}
        style={bgStyle}
        onPress={() => onSelect(item.value)}
      >
        <Text
          style={{
            fontSize: 16,
            color: textColor,
          }}
          className={`font-montserrat-medium ${
            isSelected ? 'text-secondary' : 'text-gray-60'
          }`}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  },
);

export const CustomPicker = memo((props: Props) => {
  const {
    options,
    selectedValue,
    onValueChange,
    isVisible,
    togglePicker,
    label,
    placeholder = 'Selecciona',
    widthClassName = 'w-full',
    error,
    errorMessage,
    showHeader = true,
    showCancel = true,
    cancelText = 'Cancelar',
    showAccept = false,
    acceptText = 'Aceptar',
    onAccept,
    renderTrigger,
    variant = 'sheet',
  } = props;

  const [tempValue, setTempValue] = useState(selectedValue);

  useEffect(() => {
    if (isVisible) {
      setTempValue(selectedValue);
    }
  }, [isVisible, selectedValue]);

  const displayLabel = useMemo(() => {
    const found = options.find((o) => o.value === selectedValue);
    return found ? found.label : placeholder;
  }, [options, selectedValue, placeholder]);

  const handleSelect = useCallback(
    (val: string) => {
      if (variant === 'menu') {
        onValueChange(val);
        togglePicker();
      } else {
        setTempValue(val);
      }
    },
    [variant, onValueChange, togglePicker],
  );

  const handleAccept = useCallback(() => {
    onValueChange(tempValue);
    if (onAccept) onAccept();
    togglePicker();
  }, [tempValue, onAccept, onValueChange, togglePicker]);

  const handleCancel = useCallback(() => {
    togglePicker();
  }, [togglePicker]);

  const defaultTrigger = () => (
    <TouchableOpacity
      onPress={togglePicker}
      activeOpacity={0.9}
      className={`flex-row items-center justify-between px-4 h-[48px] bg-white ${
        error ? 'border-red-500' : 'border-gray-40'
      }`}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E0E0E0',
        paddingVertical: 4,
      }}
    >
      <Text
        className="flex-1 font-montserrat-medium text-gray-60"
        numberOfLines={1}
        style={{ fontSize: 14 }}
      >
        {displayLabel}
      </Text>
      <ChevronBottomIcon />
    </TouchableOpacity>
  );

  const sheetContainer = 'flex-1 justify-end bg-black/50';
  const menuContainer = 'flex-1 justify-end bg-black/20';
  const innerSheet = 'rounded-t-2xl bg-white shadow-md shadow-black/20';
  const innerMenu = 'w-full rounded-t-2xl bg-white overflow-hidden';

  return (
    <View className={`${widthClassName} mb-3`}>
      {label && (
        <Text
          className="text-gray-60 font-montserrat-medium mb-1"
          style={{ fontSize: 14 }}
        >
          {label}
        </Text>
      )}

      {renderTrigger
        ? renderTrigger(displayLabel, togglePicker)
        : defaultTrigger()}

      {error && errorMessage && (
        <Text className="mt-1 text-xs text-red-500">{errorMessage}</Text>
      )}

      {isVisible && (
        <Modal
          transparent
          visible
          animationType="fade"
          onRequestClose={togglePicker}
        >
          <View
            className={variant === 'sheet' ? sheetContainer : menuContainer}
          >
            <TouchableOpacity
              className="flex-1 w-full h-full absolute"
              onPress={togglePicker}
              activeOpacity={1}
            />

            <SafeAreaView
              className={variant === 'sheet' ? innerSheet : innerMenu}
              style={{ maxHeight: '80%' }}
            >
              {variant === 'sheet' && showHeader && (
                <View className="flex-row items-center justify-between bg-[#EEEDED] border-b border-gray-25 px-4 py-4">
                  {showAccept ? (
                    <TouchableOpacity onPress={handleAccept} hitSlop={10}>
                      <Text
                        className="text-[#2DB4FF] font-montserrat-semibold"
                        style={{ fontSize: 16 }}
                      >
                        {acceptText}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: 60 }} />
                  )}

                  <Text
                    className="font-montserrat-semibold text-secondary"
                    style={{ fontSize: 14 }}
                  >
                    {label ?? 'Seleccionar'}
                  </Text>

                  {showCancel ? (
                    <TouchableOpacity onPress={handleCancel} hitSlop={10}>
                      <Text
                        className="text-[#2DB4FF] font-montserrat-semibold"
                        style={{ fontSize: 16 }}
                      >
                        {cancelText}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: 60 }} />
                  )}
                </View>
              )}

              {variant === 'menu' && (
                <View className="px-4 pt-4 pb-2">
                  <Text
                    className="text-start font-montserrat-semibold text-gray-700"
                    style={{ fontSize: 14 }}
                  >
                    {label ?? 'Seleccionar'}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#E0E0E0',
                      marginTop: 8,
                    }}
                  />
                </View>
              )}

              <FlatList
                data={options}
                keyExtractor={(item, index) => `${item.value}-${index}`}
                renderItem={({ item }) => (
                  <OptionItem
                    item={item}
                    selectedValue={
                      variant === 'sheet' ? tempValue : selectedValue
                    }
                    onSelect={handleSelect}
                    variant={variant}
                  />
                )}
              />
            </SafeAreaView>
          </View>
        </Modal>
      )}
    </View>
  );
});
