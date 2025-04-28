import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Divider from "./Divider";
import FormField from "./FormField";
import ArrowLeftIcon from "./Icons/ArrowLeftIcon";
import SquarePlusIcon from "./Icons/SquarePlusIcon";

interface SelectOption<T = any> {
  label: string;
  value: string;
  data?: T;
}

interface SelectProps<T = any> {
  options?: SelectOption<T>[] | Promise<SelectOption<T>[]>;
  value: string;
  onValueChange?: (value: string, option?: SelectOption<T>) => void;
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
    LoadingState?: React.ComponentType<LoadingStateProps>;
    ErrorState?: React.ComponentType<ErrorStateProps>;
  };
  maxHeight?: number;
  loadOptions?: () => Promise<SelectOption<T>[]>;
  loadOnOpen?: boolean;
}

export interface OptionProps<T = any> {
  option: SelectOption<T>;
  isSelected: boolean;
  onSelect: (value: string, option: SelectOption<T>) => void;
}

export interface SingleValueProps<T = any> {
  selectedOption?: SelectOption<T>;
  placeholder: string;
  isLoading?: boolean;
}

export interface LoadingStateProps {
  message?: string;
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
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
      isSelected ? "bg-gray-10" : ""
    )}
  >
    <Text className="text-primary-dark font-montserrat-medium">
      {option.label}
    </Text>
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
  isLoading
}: SingleValueProps) => (
  <Text
    className={cn(
      "font-montserrat-medium leading-relaxed",
      selectedOption ? "text-primary-dark" : "text-gray-40"
    )}
  >
    {isLoading ? "Cargando..." : selectedOption?.label || placeholder}
  </Text>
);

const DefaultLoadingState = ({
  message = "Cargando opciones..."
}: LoadingStateProps) => (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" color="#5F2EEA" />
    <Text className="mt-2 text-sm text-gray-60 font-montserrat-medium">
      {message}
    </Text>
  </View>
);

const DefaultErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <View className="items-center justify-center py-8">
    <Text className="mb-4 text-sm text-red-500 font-montserrat-medium">
      {message}
    </Text>
    {onRetry && (
      <TouchableOpacity
        onPress={onRetry}
        className="px-4 py-2 rounded-lg bg-primary"
      >
        <Text className="text-white font-montserrat-semibold">Reintentar</Text>
      </TouchableOpacity>
    )}
  </View>
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
  options: initialOptions,
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
  loadOptions,
  loadOnOpen = true
}: SelectProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    if (Array.isArray(initialOptions)) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  const fetchOptions = async () => {
    if (!loadOptions && !initialOptions) return;

    setIsLoading(true);
    setLoadError(null);

    try {
      let result: SelectOption[] = [];

      if (loadOptions) {
        result = await loadOptions();
      } else if (initialOptions) {
        result = Array.isArray(initialOptions)
          ? initialOptions
          : await initialOptions;
      }

      setOptions(result);
    } catch (err) {
      setLoadError("Error al cargar las opciones");
    } finally {
      setIsLoading(false);
    }
  };

  const showPicker = async () => {
    if (disabled) return;
    setIsPickerVisible(true);

    if (
      loadOnOpen &&
      (loadOptions || (initialOptions && !Array.isArray(initialOptions)))
    ) {
      await fetchOptions();
    }
  };

  const handleValueChange = (itemValue: string, option?: SelectOption) => {
    setSelectedValue(itemValue);
    if (onValueChange) {
      onValueChange(itemValue, option);
    }
    setIsPickerVisible(false);
  };

  const selectedOption = options?.find(
    (option) => option.value === selectedValue
  );

  const Option = components.Option || DefaultOption;
  const SingleValue = components.SingleValue || DefaultSingleValue;
  const CreateOption = components.CreateOption || DefaultCreateOption;
  const LoadingState = components.LoadingState || DefaultLoadingState;
  const ErrorState = components.ErrorState || DefaultErrorState;

  return (
    <View className={cn("flex flex-col gap-2 relative", className)}>
      <FormField label={label} error={error} labelClassName={labelClassName}>
        <Pressable
          onPress={showPicker}
          disabled={disabled}
          className={cn(
            "flex flex-row justify-between border rounded-lg px-4 py-2 border-gray-25 h-11 bg-white",
            disabled ? "opacity-60 bg-gray-100" : "",
            error ? "border-red-500" : ""
          )}
        >
          <View className="justify-center flex-1">
            <SingleValue
              selectedOption={selectedOption}
              placeholder={placeholder}
              isLoading={isLoading && !isPickerVisible}
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
                      modalTitleClassName
                    )}
                  >
                    {modalTitle}
                  </Text>
                </View>

                <Divider />

                <View className="w-full py-3 pb-10" style={{ maxHeight }}>
                  {isLoading ? (
                    <LoadingState />
                  ) : loadError ? (
                    <ErrorState message={loadError} onRetry={fetchOptions} />
                  ) : (
                    <ScrollView
                      contentContainerClassName="pb-8"
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
                        <>
                          {options.length > 0 && (
                            <Divider className="bg-slate-200" />
                          )}
                          <CreateOption
                            label={createOptionLabel}
                            onPress={() => {
                              onCreateOption();
                              setIsPickerVisible(false);
                            }}
                          />
                        </>
                      )}
                    </ScrollView>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomSelect;
