import { Pressable, Text, View, Modal } from "react-native";
import sourceList from '../../../mocks/sourceFunds.json';
import { useState } from "react";

interface Props {
  openModal: boolean,
  setOpenModal: (val: boolean) => void,
  setValue: (val: string) => void,
}

type Source =  {
  _id: string,
  name: string,
}

interface SourceProps {
  source: Source,
  setValue: (val: Source) => void,
  value: Source
}

const accounts = [
  {
    alias: 'Scotiabank',
    currency: 'PEN',
    number: '******44444'
  },
  {
    alias: 'BCP',
    currency: 'PEN',
    number: '******44444'
  }
]

export function SourceCard({source, setValue, value}: SourceProps){
  const isSelected = value._id === source._id;
  return (
    <Pressable 
      onPress={() => {
      setValue(source);
      }}
      className={`${isSelected && "bg-k-gray-20"} py-2`}
    >
      <Text className={`font-mont text-center ${isSelected ? "text-md text-gray-500" : "text-sm text-k-gray-40"}`}>
        {source.name}
      </Text>
    </Pressable>
  );
}

export function SourceList({openModal, setOpenModal, setValue}: Props){
  const [selected, setSelected] = useState<Source>(sourceList[0]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(false)}
    >
      <View className="flex-1">
        <Pressable className="flex-1 bg-black opacity-50" onPress={() => setOpenModal(false)} />
        <View className="bg-white rounded-t-3xl h-1/3 align-bottom absolute w-full bottom-0">
          <View className="flex-row justify-between p-4">
            <Pressable onPress={() => {
              setValue(selected?.name);
              setOpenModal(false);
            }}>
              <Text className="text-blue-700 font-mont">Aceptar</Text>
            </Pressable>
            <Pressable onPress={() => setOpenModal(false)}>
              <Text className="text-blue-700 font-mont">Cancelar</Text>
            </Pressable>
          </View>
          <View className="mt-2">
            {
              sourceList.map((e) => (
                <SourceCard source={e} key={e._id} value={selected} setValue={setSelected}/>
              ))
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}
