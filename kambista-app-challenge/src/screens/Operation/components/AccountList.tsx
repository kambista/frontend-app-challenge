import { Pressable, Text, View, Modal } from "react-native";
import bankList from '../../../mocks/bankAccounts.json';
import { PlusIcon } from "lucide-react-native";
import KambistaColors from "../../../utils/colors";
import { useState } from "react";
import { NewAccountModal } from "./NewAccountModal";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  openModal: boolean,
  setOpenModal: (val: boolean) => void,
  setValue: (val: string) => void,
}

type Account =  {
  nameAccount: string,
  currency: string,
  accountNumber: string,
}

interface AccountProps {
  account: Account,
  setValue: (val: string) => void,
  setOpenModal: (val: boolean) => void,
}

const accounts = [
  {
    nameAccount: 'Scotiabank',
    currency: 'PEN',
    accountNumber: '******44444'
  },
  {
    nameAccount: 'BCP',
    currency: 'PEN',
    accountNumber: '******44444'
  }
]

export function AccountCard({account, setValue, setOpenModal}: AccountProps){
  return (
    <Pressable onPress={() => {
      setValue(account.nameAccount);
      setOpenModal(false);
    }}>
      <Text className="font-mont text-sm">{`Alias - ${account.nameAccount} - ${account.currency}`}</Text>
      <Text className="font-mont text-sm text-k-gray-40">{account.accountNumber}</Text>
    </Pressable>
  );
}

export function AccountList({openModal, setOpenModal, setValue}: Props){
  const [openNewAccountModal, setOpenNewAccountModal] = useState(false);
  const [accountList, setAccountList] = useState(accounts);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <View className="flex-1">
          <Pressable className="flex-1 bg-black opacity-50" onPress={() => setOpenModal(false)} />
          <View className="bg-white rounded-t-3xl p-5 h-1/3 align-bottom absolute w-full bottom-0">
            <Text className="font-montBold text-sm text-k-gray-60">Seleccione una cuenta de destino</Text>
            <View className="h-px w-full bg-gray-400 my-2" />
            <View className="h-3/4 pb-10">
              <ScrollView className="gap-4 mt-2">
                {
                  accountList.map((e) => (
                    <AccountCard account={e} key={e.nameAccount} setValue={setValue} setOpenModal={setOpenModal} />
                  ))
                }
              </ScrollView>
            </View>
          </View>
          <Pressable className="flex-row gap-2 items-center p-4 mb-2" onPress={() => {
            setOpenModal(false);
            setOpenNewAccountModal(true);
          }}>
            <View className="border-2 border-k-gray-60 p-2 rounded-md">
              <PlusIcon color={KambistaColors.gray60} size={20} />
            </View>
            <Text className="font-mont text-sm">Agregar cuenta</Text>
          </Pressable>
        </View>
      </Modal>
      <NewAccountModal
        setOpenModal={setOpenNewAccountModal}
        openModal={openNewAccountModal}
        setValue={setValue}
        setAccountList={setAccountList}
        accountList={accountList}
      />
    </>
  )
}
