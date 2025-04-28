import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Button, Modal, Pressable, Text, View, TouchableOpacity } from 'react-native';
import KambistaColors from '../utils/colors';

interface PickerItem {
  label: string;
  value: any;
}

interface FormPickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  items: PickerItem[];
  required?: boolean;
}

export function FormPicker({ name, control, label, placeholder = "Selecciona una opción", items, required }: FormPickerProps) {
  const [openModal, setOpenModal] = useState(false);

  const getBorderByState = (error: FieldError | undefined) => {
    if (error) {
      return 'border-warning';
    }
    return 'border-k-gray-25';
  };

  return (
    <>
      <View className="mb-4 w-full">
        {label && <Text className="text-sm mb-1 text-k-gray-60 font-mont">{label}</Text>}
        <Controller
          control={control}
          name={name}
          rules={{ required }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Pressable
                className={`border ${getBorderByState(error)} rounded-md bg-white py-3 px-4`}
                onPress={() => setOpenModal(true)}
              >
                <View className='flex-row justify-between items-center gap-2'>
                  <Text className={value ? "text-k-gray-40" : "text-k-gray-40"}>
                    {value 
                      ? items.find(item => item.value === value)?.label 
                      : placeholder}
                  </Text>
                  <ChevronDown color={KambistaColors.gray60} size={20} />
                </View>
              </Pressable>
              
              {error && (
                <Text className="text-red-500 mt-1 text-xs">
                  Este campo es obligatorio
                </Text>
              )}
              <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
              >
                <View className="flex-1 justify-center items-center bg-black/50">
                  <View className="w-3/4 bg-white p-6 rounded-xl shadow-lg">
                    <View className="gap-2">
                      {items.map((e, idx) => (
                        <TouchableOpacity
                          key={idx}
                          className="p-3 border-b border-k-gray-20"
                          onPress={() => {
                            onChange(e.value);
                            setOpenModal(false);
                          }}
                        >
                          <Text className="text-base">{e.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />
      </View>
    </>
  );
}
