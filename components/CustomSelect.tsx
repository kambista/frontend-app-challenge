import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import FormField from "./FormField";
import { cn } from "@/utils/cn";
import ArrowLeftIcon from "./Icons/ArrowLeftIcon";
import Divider from "./Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import SquarePlusIcon from "./Icons/SquarePlusIcon";

interface SelectOption<T = any> {
  label: string;
  value: string | number;
  data?: T;
}

interface SelectProps<T = any> {
  options: SelectOption<T>[];
  value?: string | number;
  onValueChange?: (value: string | number, option?: SelectOption<T>) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  modalTitle?: string;
  modalTitleClassName?: string;
  showCreateOption?: boolean;
  createOptionLabel?: string;
  onCreateOption?: () => void;
  components?: {
    Option?: React.ComponentType<OptionProps<T>>;
    SingleValue?: React.ComponentType<SingleValueProps<T>>;
    CreateOption?: React.ComponentType<CreateOptionProps>;
  };
  maxHeight?: number;
}

export interface OptionProps<T = any> {
  option: SelectOption<T>;
  isSelected: boolean;
  onSelect: (value: string | number, option: SelectOption<T>) => void;
}

export interface SingleValueProps<T = any> {
  selectedOption?: SelectOption<T>;
  placeholder: string;
}

interface CreateOptionProps {
  label: string;
  onPress: () => void;
}

const DefaultOption = ({ option, isSelected, onSelect }: OptionProps) => (
  <TouchableOpacity
    onPress={() => onSelect(option.value, option)}
    className={cn(
      "px-4 py-3 flex-row justify-between items-center",
      isSelected ? "bg-gray-10" : "",
    )}
  >
    <Text className="text-gray-60 font-montserrat-medium">{option.label}</Text>
    {isSelected && (
      <View className="items-center justify-center w-5 h-5 rounded-full bg-primary">
        <Text className="text-xs font-bold text-white">✓</Text>
      </View>
    )}
  </TouchableOpacity>
);

const DefaultSingleValue = ({
  selectedOption,
  placeholder,
}: SingleValueProps) => (
  <Text
    className={cn(
      "font-montserrat-medium leading-relaxed",
      selectedOption ? "text-gray-60" : "text-gray-40",
    )}
  >
    {selectedOption?.label || placeholder}
  </Text>
);

const DefaultCreateOption = ({ label, onPress }: CreateOptionProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center gap-4 px-1 py-3"
  >
    <SquarePlusIcon size={38} color="#060F26" />
    <Text className="text-sm text-primary-dark font-montserrat-regular">
      {label}
    </Text>
  </TouchableOpacity>
);

const CustomSelect = ({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar...",
  className,
  labelClassName,
  disabled = false,
  label,
  error,
  modalTitle = "Seleccionar opción",
  modalTitleClassName,
  showCreateOption = false,
  createOptionLabel = "Crear nuevo",
  onCreateOption,
  components = {},
  maxHeight = 300,
}: SelectProps) => {
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const showPicker = () => {
    if (!disabled) {
      setIsPickerVisible(true);
    }
  };

  const handleValueChange = (
    itemValue: string | number,
    option?: SelectOption,
  ) => {
    setSelectedValue(itemValue);
    if (onValueChange) {
      onValueChange(itemValue, option);
    }
    setIsPickerVisible(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const Option = components.Option || DefaultOption;
  const SingleValue = components.SingleValue || DefaultSingleValue;
  const CreateOption = components.CreateOption || DefaultCreateOption;

  return (
    <View className={cn("flex flex-col gap-2 relative", className)}>
      <FormField label={label} error={error} labelClassName={labelClassName}>
        <Pressable
          onPress={showPicker}
          disabled={disabled}
          className={cn(
            "flex flex-row justify-between border rounded-lg px-4 py-2 border-gray-25 h-11 bg-white",
            disabled ? "opacity-60 bg-gray-100" : "",
            error ? "border-red-500" : "",
          )}
        >
          <View className="justify-center flex-1">
            <SingleValue
              selectedOption={selectedOption}
              placeholder={placeholder}
            />
          </View>

          <View className="py-1">
            <ArrowLeftIcon
              size={16}
              color="#686868"
              style={{ transform: [{ rotate: "270deg" }] }}
            />
          </View>
        </Pressable>
      </FormField>

      <Modal
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
        transparent
      >
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View className="items-center justify-center flex-1 bg-black/30">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="absolute bottom-0 w-full px-4 overflow-hidden bg-white rounded-t-3xl">
                <View className="px-2 pt-5 pb-4">
                  <Text
                    className={cn(
                      "text-base text-center text-gray-60 font-montserrat-semibold",
                      modalTitleClassName,
                    )}
                  >
                    {modalTitle}
                  </Text>
                </View>

                <Divider />

                <ScrollView
                  className="w-full py-3 pb-10"
                  style={{ maxHeight }}
                  showsVerticalScrollIndicator={false}
                >
                  {options.map((option) => (
                    <React.Fragment key={option.value}>
                      <Option
                        option={option}
                        isSelected={selectedValue === option.value}
                        onSelect={handleValueChange}
                      />
                      {showCreateOption ||
                      options[options.length - 1] !== option ? (
                        <Divider
                          orientation="horizontal"
                          className="bg-slate-200"
                        />
                      ) : null}
                    </React.Fragment>
                  ))}

                  {showCreateOption && onCreateOption && (
                    <CreateOption
                      label={createOptionLabel}
                      onPress={() => {
                        onCreateOption();
                        setIsPickerVisible(false);
                      }}
                    />
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomSelect;
