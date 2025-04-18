import { Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Accounts } from '@/constants/Backend';
import { Octicons } from '@expo/vector-icons';

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

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} enableDynamicSizing={false}>
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 20,
          alignItems: 'flex-start',
        }}
      >
        <Text className="self-center text-base font-mmedium">Selecciona tu cuenta de destino</Text>

        <View className="flex-1 h-px bg-gray-300 my-2" />

        {Accounts.map((acc) => {
          const length = acc.account_number.length;
          const temp_acc = '******' + acc.account_number.slice(length - 4, length);
          return (
            <TouchableOpacity
              key={acc.id}
              className="bg-white rounded-3xl mb-4 px-6 w-full"
              onPress={() => {
                onAccountSelected(acc);
              }}
            >
              <Text className="self-start font-mmedium text-black">
                Alias - {acc.account_name} - {acc.currency}
              </Text>
              <Text className="self-start font-mregular text-black">{temp_acc}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity className="bg-white rounded-3xl mb-4 px-6 w-full flex flex-row" onPress={() => {}}>
          <Octicons name="plus" size={24} />
          <Text className="ml-6 self-start font-mregular text-black">Agregar cuenta</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default SelectAccountDrawer;
