import FormField from "@/components/FormField";
import { cn } from "@/utils/cn";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

interface DatePickerProps {
  value?: string | Date;
  onChange?: (date: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  formatDate?: (date: Date) => string;
}

const DatePicker = ({
  value,
  onChange,
  label,
  error,
  placeholder = "DD/MM/AAAA",
  className,
  disabled = false,
  minimumDate,
  maximumDate,
  formatDate
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(() => {
    if (value === "" || value === undefined || value === null) {
      return null;
    }
    return typeof value === "string" ? new Date(value) : value;
  });
  const [showPicker, setShowPicker] = useState(false);

  const formatDisplayDate = (date?: Date | null): string => {
    if (!date) return placeholder;
    if (formatDate) return formatDate(date);

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    if (Platform.OS === "android") setShowPicker(false);
    setDate(currentDate);

    if (onChange && currentDate) onChange(currentDate.toISOString());
  };

  const toggleDatePicker = () => {
    if (!disabled) setShowPicker(!showPicker);
  };

  return (
    <FormField label={label} error={error} className={className}>
      <Pressable
        onPress={toggleDatePicker}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-between border rounded-lg px-4 py-3 border-gray-25 h-11",
          disabled ? "opacity-60 bg-gray-100" : "",
          error ? "border-red-500" : ""
        )}
      >
        <Text
          className={cn(
            "font-montserrat-medium leading-tight",
            date ? "text-primary-dark" : "text-gray-40"
          )}
        >
          {formatDisplayDate(date)}
        </Text>
      </Pressable>

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showPicker} animationType="fade" transparent>
          <View className="justify-end flex-1 bg-black/25">
            <View className="bg-white rounded-t-lg">
              <View className="flex-row justify-between px-6 py-2 bg-[#EEEDED]">
                <Pressable onPress={() => setShowPicker(false)}>
                  <Text className="text-base font-semibold text-sky-400">
                    Aceptar
                  </Text>
                </Pressable>
                <Pressable onPress={() => setShowPicker(false)}>
                  <Text className="text-base font-semibold text-sky-400">
                    Cancelar
                  </Text>
                </Pressable>
              </View>

              <View className="flex justify-center w-full">
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  style={{ height: 200, minWidth: "100%" }}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  textColor="#000000"
                  locale="es-ES"
                />
              </View>

              <View className="h-6" />
            </View>
          </View>
        </Modal>
      )}
    </FormField>
  );
};

export default DatePicker;
