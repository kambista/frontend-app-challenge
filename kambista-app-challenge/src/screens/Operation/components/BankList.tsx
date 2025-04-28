import { Pressable, Text, View, Modal } from "react-native";
import bankList from '../../../mocks/bankAccounts.json';

interface Props {
  openModal: boolean,
  setOpenModal: (val: boolean) => void,
  setValue: (val: string) => void,
}

export function BankList({openModal, setOpenModal, setValue}: Props){
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(false)}
    >
      <View className="flex-1">
        <Pressable className="flex-1 bg-black opacity-50" onPress={() => setOpenModal(false)} />
        <View className="bg-white rounded-t-3xl p-5 h-1/2 align-bottom absolute w-full bottom-0">
          <Text className="font-montBold text-sm text-center">¿Desde que banco nos envías tu dinero?</Text>
          <View className="h-px w-full bg-gray-500 my-4" />
          <View className="gap-1">
            {
              bankList.map((e) => (
                <Pressable 
                  key={e.name} 
                  onPress={()=> {
                    setValue(e.name)
                    setOpenModal(false);
                    }}
                >
                  <Text className="font-mont text-sm">{e.name}</Text>
                </Pressable>
              ))
            }
          </View>
        </View>
      </View>
    </Modal>
  )
}
