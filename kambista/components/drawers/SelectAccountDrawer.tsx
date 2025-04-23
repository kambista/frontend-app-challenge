import { Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Accounts } from '@/constants/Backend';
import { Octicons } from '@expo/vector-icons';
import { Account } from '@/models';
import CreateAccountDrawer from './CreateAccountDrawer';

export type Ref = BottomSheetModal;

type SelectAccountDrawerProps = {
  onAccountSelected: (sourceFund: any) => void;
};

const SelectAccountDrawer = forwardRef<Ref, SelectAccountDrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const onAccountSelected = (sourceFund: any) => {
    props.onAccountSelected(sourceFund);
  };

  const { dismiss } = useBottomSheetModal();

  const createAccountDrawerRef = useRef<BottomSheetModal>(null);
  const handlePresentCreateAccountDrawer = () => createAccountDrawerRef.current?.present();

  const handleAccountCreate = async (account: Account) => {
    dismiss();
  };

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} enableDynamicSizing={false}>
      <CreateAccountDrawer ref={createAccountDrawerRef} onAccountSelected={handleAccountCreate} />
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 20,
          alignItems: 'flex-start',
          display: 'flex',
        }}
      >
        <Text className="self-center text-base font-mmedium">Selecciona tu cuenta de destino</Text>

        <View className="w-full h-px bg-gray-300 my-4" />

        {Accounts.map((acc) => {
          const length = acc.account_number.length;
          const temp_acc = '******' + acc.account_number.slice(length - 4, length);
          return (
            <View key={acc.id} className="mb-4">
              <TouchableOpacity
                key={acc.id}
                className="bg-white rounded-3xl w-full px-3"
                onPress={() => {
                  onAccountSelected(acc);
                }}
              >
                <Text className="self-start font-mmedium text-black text-lg">
                  Alias - {acc.account_name} - {acc.currency}
                </Text>
                <Text className="self-start font-mregular text-black">{temp_acc}</Text>
              </TouchableOpacity>
              <View className="w-full h-px bg-gray-300 my-4" />
            </View>
          );
        })}

        <TouchableOpacity className="px-3 bg-white rounded-3xl mb-4 w-full flex flex-row" onPress={handlePresentCreateAccountDrawer}>
          <View className="border flex items-center justify-center aspect-square h-12 rounded-md">
            <Octicons name="plus" size={24} />
          </View>
          <Text className="ml-6 self-center font-mregular text-black">Agregar cuenta</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default SelectAccountDrawer;
