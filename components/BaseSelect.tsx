import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { cn } from "../utils/cn";
import FormField from "./FormField";
import ArrowLeftIcon from "./Icons/ArrowLeftIcon";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  isOptional?: boolean;
}

const BaseSelect = ({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar...",
  className,
  labelClassName,
  disabled = false,
  label,
  error,
  isOptional = false
}: SelectProps) => {
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange?.(itemValue);
  };

  const showPicker = () => {
    if (!disabled) {
      setIsPickerVisible(true);
    }
  };

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label ||
    placeholder;

  return (
    <View className={cn("flex flex-col gap-2 relative", className)}>
      <FormField
        label={label}
        error={error}
        labelClassName={labelClassName}
        isOptional={isOptional}
      >
        <Pressable
          onPress={showPicker}
          disabled={disabled}
          className={cn(
            "flex flex-row justify-between border rounded-lg px-4 py-2 border-gray-25 h-11 bg-white",
            disabled ? "opacity-60 bg-gray-100" : "",
            error ? "border-red-500" : ""
          )}
        >
          <Text
            className={cn(
              "font-montserrat-medium leading-relaxed",
              selectedValue ? "text-primary-dark" : "text-gray-40"
            )}
          >
            {selectedLabel}
          </Text>

          <View className="py-1">
            <ArrowLeftIcon
              size={16}
              color="#686868"
              style={{ transform: [{ rotate: "270deg" }] }}
            />
          </View>
        </Pressable>
      </FormField>

      {Platform.OS === "ios" ? (
        <Modal
          visible={isPickerVisible}
          animationType="fade"
          onRequestClose={() => setIsPickerVisible(false)}
          transparent
        >
          <View className="justify-end flex-1 bg-black/30">
            <View className="bg-white">
              <View className="flex-row justify-between px-6 py-2 bg-[#EEEDED]">
                <Pressable
                  onPress={() => {
                    setIsPickerVisible(false);
                    handleValueChange(
                      String(selectedValue || options[0].value)
                    );
                  }}
                >
                  <Text className="text-base font-semibold text-sky-400">
                    Aceptar
                  </Text>
                </Pressable>
                <Pressable onPress={() => setIsPickerVisible(false)}>
                  <Text className="text-base font-semibold text-sky-400">
                    Cancelar
                  </Text>
                </Pressable>
              </View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                  handleValueChange(itemValue);
                }}
                itemStyle={{ color: "black" }}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value.toString()}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      ) : (
        <View className="absolute bottom-0 left-0 right-0 opacity-0 top-6">
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            enabled={!disabled}
            style={{ height: 50, width: "100%", opacity: 1 }}
            mode="dropdown"
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value.toString()}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

export default BaseSelect;
