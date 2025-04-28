import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Button, Modal, Pressable, Text, View, TouchableOpacity } from 'react-native';
import { Currencies } from '../../../store/OperationStore';

interface PickerItem {
  label: string;
  value: any;
}

interface FormPickerProps {
  value: Currencies;
  setValue: (val:Currencies) => void,
  placeholder?: string;
  items: PickerItem[];
}

export function ExchangePicker({ value, setValue, placeholder,  items }: FormPickerProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <View className="w-full items-center justify-center">
         <>
          <Pressable
            className={`py-3 px-4`}
            disabled
            onPress={() => setOpenModal(true)}
          >
            <View className='flex-row justify-between items-center gap-1'>
              <Text className="text-white font-montBold">
                {value 
                  ? items.find(item => item.value === value)?.label 
                  : placeholder}
              </Text>
              <ChevronDown color={'white'} size={20} />
            </View>
          </Pressable>
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
                        setValue(e.value);
                        setOpenModal(false);
                      }}
                    >
                      <Text className="text-base">{e.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Button title="Cancelar" onPress={() => setOpenModal(false)} />
              </View>
            </View>
          </Modal>
        </>
      </View>
    </>
  );
}
